'use client'
import { ProjectApi } from '@/api/ProjectApi'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema, FormValues } from './schema'

interface Props {
  projectId?: string
}

const ProjectForm: React.FC<Props> = ({ projectId }) => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const fetchData = useCallback(async () => {
    if (projectId) {
      const data = await ProjectApi.getProjectById(projectId)
      setValue('projectName', data.name)
    }
  }, [projectId, setValue])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const cancelHandle = () => {
    router.back()
  }

  const create = (projectName: string) => {
    return ProjectApi.postProject({ projectName: projectName })
  }

  const update = (projectId: string, projectName: string) => {
    return ProjectApi.putProject({
      projectId: projectId,
      projectName: projectName,
    })
  }

  const submitForm = async (data: FormValues) => {
    const { projectName } = data
    const result = await (projectId
      ? update(projectId, projectName)
      : create(projectName))
    if (result.ok) {
      router.back()
    }
  }

  const labels = projectId
    ? {
        title: 'Editing the Project',
        submit: 'Update the project',
      }
    : {
        title: 'Create a new Project',
        submit: 'Create project',
      }

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            {labels.title}
          </h2>
        </div>
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-6' onSubmit={handleSubmit(submitForm)}>
            <div>
              <label
                htmlFor='projectName'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Project name
              </label>
              <div className='mt-2'>
                <input
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  {...register('projectName')}
                />
                {errors.projectName && (
                  <p className='text-xs text-red-400'>
                    {errors.projectName.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <button
                type='submit'
                className='flex w-full justify-center mt-1 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                {labels.submit}
              </button>
              <button
                type='button'
                onClick={cancelHandle}
                className='flex w-full justify-center mt-1 rounded-md bg-red-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ProjectForm
