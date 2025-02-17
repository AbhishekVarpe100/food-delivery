import React from 'react'
import { useParams } from 'react-router-dom';

function EditSuggestion() {
    const {id}=useParams()
  return (
    <div>EditSuggestion {id}</div>
  )
}

export default EditSuggestion;