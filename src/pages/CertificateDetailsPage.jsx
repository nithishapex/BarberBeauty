import { Navigate, useParams } from 'react-router-dom'
import { certificateVerifyPath } from '../data/certificates'

export default function CertificateDetailsPage() {
  const { certificateId } = useParams()
  return <Navigate to={certificateVerifyPath(certificateId || '')} replace />
}
