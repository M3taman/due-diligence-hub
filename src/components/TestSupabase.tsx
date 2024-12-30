import * as React from 'react'
import { useEffect, useState } from 'react'
import { fetchVersion, fetchData } from '../supabaseClient'
import { fetchProfiles, insertProfile, updateProfile, deleteProfile } from '../crudOperations'
import { signUp, signIn, signOut } from '../auth'

const TestSupabase = () => {
  const [version, setVersion] = useState<string | null>(null)
  const [data, setData] = useState<any[]>([])
  const [profiles, setProfiles] = useState<any[]>([])

  useEffect(() => {
    const getVersion = async () => {
      const versionData = await fetchVersion()
      if (versionData) {
        setVersion(versionData)
      }
    }

    const getData = async () => {
      const dataResult = await fetchData()
      if (dataResult) {
        setData(dataResult)
      }
    }

    const getProfiles = async () => {
      const profilesData = await fetchProfiles()
      if (profilesData) {
        setProfiles(profilesData)
      }
    }

    const addProfile = async () => {
      await insertProfile('newuser@example.com', 'user')
      await getProfiles()
    }

    const modifyProfile = async () => {
      await updateProfile(1, 'updateduser@example.com', 'admin')
      await getProfiles()
    }

    const removeProfile = async () => {
      await deleteProfile(1)
      await getProfiles()
    }

    getVersion()
    getData()
    getProfiles()

    // Example usage
    // addProfile()
    // modifyProfile()
    // removeProfile()

    // Example authentication usage
    // signUp('user@example.com', 'password123')
    // signIn('user@example.com', 'password123')
    // signOut()
  }, [])

  return (
    <div>
      <h1>Supabase Test</h1>
      {version ? <p>Database Version: {version}</p> : <p>Loading...</p>}
      {data.length > 0 ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>No data available.</p>
      )}
      <h2>Profiles</h2>
      {profiles.length > 0 ? (
        <pre>{JSON.stringify(profiles, null, 2)}</pre>
      ) : (
        <p>No profiles available.</p>
      )}
    </div>
  )
}

export default TestSupabase