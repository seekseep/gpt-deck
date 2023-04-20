'use client'

import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

type MutateVariables = {
  apiKey: string
  isSaveApiKey: boolean
  prompt: string
}

type FormValues = MutateVariables

const DEFAULT_API_KEY = process.env.NEXT_PUBLIC_OPEN_AI_KEY

export default function Home() {

  const {
    register,
    handleSubmit
  } = useForm<FormValues>({
    defaultValues: {
      apiKey: DEFAULT_API_KEY,
      isSaveApiKey: false,
      prompt: ""
    }
  })

  const {
    mutate,
    error,
    data,
    isSuccess,
    isError
  } = useMutation({
    mutationFn: async (variables: MutateVariables) => {
      const res = await fetch(
        '/api/prompt',
        {
          method: "POST",
          body: JSON.stringify(variables),
          headers: {
            'Content-Type': "application/json",
            'Accept': 'application/json',
          }
        }
      )
      return await res.text()
    }
  })

  const onSubmit = (variables: MutateVariables) => {
    mutate(variables)
  }

  console.log({ isError, error, data })

  return (
    <div className="w-full h-screen flex bg-gray-100 p-4 gap-4">
      <div className="bg-white rounded-lg w-96 overflow-auto">
        <form className="flex flex-col gap-2 max-w-lg p-4 items-start text-sm" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="apiKeyInput">API Key</label>
            <input required id="apiKeyInput" className="border p-2 rounded" type="text" {...register("apiKey")} />
            <div className="flex gap-2">
              <input id="isSaveApiKeyInput" type="checkbox"  {...register("isSaveApiKey")} />
              <label className="select-none" htmlFor="isSaveApiKeyInput">Save API Key</label>
            </div>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="promptInput">Prompt</label>
            <textarea required id="promptInput" className="border p-2 rounded" rows={20} {...register("prompt")}></textarea>
          </div>
          <button className="bg-gray-100 border px-2 py-1 rounded">Submit</button>
        </form>
      </div>
      <div className="bg-white rounded-lg grow overflow-auto">
        {isError && (
          <div className="p-4">
            <div className="bg-red-50">
              <pre>
                {JSON.stringify(error, null, 2)}
              </pre>
            </div>
          </div>
        )}
        {isSuccess && (
          <div className="p-4">
            <pre>{data as string}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
