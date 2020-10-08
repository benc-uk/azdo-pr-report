import { encode } from 'https://deno.land/std@0.73.0/encoding/base64.ts'

const API_VERSION = '6.1-preview.1'

export class AzDo {
  accessToken: string
  orgUrl: string

  constructor(org: string, pat: string) {
    this.orgUrl = org
    this.accessToken = `user:${pat}`
  }

  //
  // Get all PRs for a project
  //
  public async getPullRequests(proj: string, status = "", top = 0, skip = 0): Promise<Record<string, any>[]> {
    return this.callAPI(`${proj}/_apis/git/pullrequests?searchCriteria.status=${status}&$top=${top}&$skip=${skip}`)
  }

  //
  // Generic API call wrapper
  //
  async callAPI(apiPartial: string): Promise<any> {
    const url = `${this.orgUrl}/${apiPartial}&api-version=${API_VERSION}`
    console.log(`### Calling ${url}`)

    const req: RequestInit = {
      headers: {
        Authorization: `Basic ${encode(this.accessToken)}`
      }
    }

    const resp = await fetch(url, req)
    if (!resp.ok) {
      throw new Error(`API call to ${url} returned ${resp.status}`)
    }

    try {
      const data = await resp.json()
      // Return value field as simplification
      return data.value ? data.value : data
    } catch (err) {
      throw new Error(`API call didn't return JSON, probably an auth problem`)
    }
  }
}