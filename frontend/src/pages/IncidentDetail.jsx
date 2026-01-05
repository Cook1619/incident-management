import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectSelectedIncident,
  selectAllIncidents,
  setSelectedIncident,
  clearSelectedIncident,
  fetchIncidentById,
} from '../store/slices/incidentsSlice'

function IncidentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const incident = useSelector(selectSelectedIncident)
  const allIncidents = useSelector(selectAllIncidents)

  useEffect(() => {
    // For dummy data, find incident from store
    const foundIncident = allIncidents.find(inc => inc.id === parseInt(id))
    if (foundIncident) {
      dispatch(setSelectedIncident(foundIncident))
    }
    
    // Uncomment to fetch from API instead
    // dispatch(fetchIncidentById(id))

    return () => {
      dispatch(clearSelectedIncident())
    }
  }, [id, dispatch, allIncidents])

  if (!incident) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Incident not found</p>
          <Link
            to="/"
            className="mt-4 inline-block text-blue-600 hover:text-blue-800"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'open':
        return 'bg-blue-100 text-blue-800'
      case 'in progress':
        return 'bg-purple-100 text-purple-800'
      case 'resolved':
        return 'bg-green-100 text-green-800'
      case 'closed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 flex items-center mb-4"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          Incident {incident.number}
        </h1>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {incident.short_description}
          </h2>
        </div>

        <div className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Incident Number
              </h3>
              <p className="text-base text-gray-900">{incident.number}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Category
              </h3>
              <p className="text-base text-gray-900">{incident.category}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Priority
              </h3>
              <span
                className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${getPriorityColor(
                  incident.priority
                )}`}
              >
                {incident.priority}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
              <span
                className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${getStatusColor(
                  incident.status
                )}`}
              >
                {incident.status}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Assigned To
              </h3>
              <p className="text-base text-gray-900">
                {incident.assigned_to || 'Unassigned'}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Created At
              </h3>
              <p className="text-base text-gray-900">
                {new Date(incident.created_at).toLocaleString()}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Updated At
              </h3>
              <p className="text-base text-gray-900">
                {new Date(incident.updated_at).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Description
            </h3>
            <div className="bg-gray-50 rounded-md p-4">
              <p className="text-base text-gray-900 whitespace-pre-wrap">
                {incident.description}
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Edit
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default IncidentDetail
