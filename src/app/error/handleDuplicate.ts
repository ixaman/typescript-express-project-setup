import { TErrorSource, TGenericErrorResponse } from '../interface/error'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicate = (err: any): TGenericErrorResponse => {
  // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/)

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1]

  const errorSources: TErrorSource = [
    {
      path: '',
      message: `${extractedMessage} is already exist !`,
    },
  ]

  const statusCode = 400
  return {
    statusCode,
    message: 'Duplicate Value',
    errorSources,
  }
}

export default handleDuplicate
