import { Request, Response, NextFunction } from 'express'

export const apiKeyAuthentication = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key']
  if (apiKey && apiKey === process.env.API_KEY) {
    return next()
  }
  res.status(401).json({ message: 'Invalid API Key' })
}
