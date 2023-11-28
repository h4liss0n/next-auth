'use client'
import { TaskApi } from '@/api/TaskApi'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormValues, formSchema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'

interface Props {
  projectId: string
  taskId?: string
}

interface Task {
  title: string
  done: boolean
}

const TaskForm: React.FC<Props> = ({ projectId, taskId }) => {
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
    if (taskId) {
      const data = await TaskApi.getTaskById(taskId)
      setValue('title', data.title)
      setValue('done', data.done)
    }
  }, [setValue, taskId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const cancelHandle = () => {
    router.back()
  }

  const create = (title: string, done: boolean) => {
    return TaskApi.postTask({
      title: title,
      projectId: projectId,
      done: done,
    })
  }

  const update = (id: string, title: string, done: boolean) => {
    return TaskApi.putTask({
      id: id,
      title: title,
      projectId: projectId,
      done: done,
    })
  }

  const submitForm = async (data: FormValues) => {
    const { title, done } = data
    const result = await (taskId
      ? update(taskId, title, done)
      : create(title, done))
    if (result.ok) {
      router.back()
    }
  }

  const labels = taskId
    ? {
        title: 'Editing Task',
        submit: 'Update Task',
      }
    : {
        title: 'Create a new Task',
        submit: 'Create Task',
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
                htmlFor='title'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Title
              </label>
              <div className='mt-2'>
                <input
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  {...register('title')}
                />
                {errors.title && (
                  <p className='text-xs text-red-400'>{errors.title.message}</p>
                )}
              </div>
            </div>
            <div>
              <div className=' flex items-center '>
                <input id='done' type='checkbox' {...register('done')} />
                <label
                  htmlFor='done'
                  className='mx-2 text-sm font-medium leading-6 text-gray-900'
                >
                  Status
                </label>
              </div>
              {errors.done && (
                <p className='text-xs text-red-400'>{errors.done.message}</p>
              )}
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

export default TaskForm
