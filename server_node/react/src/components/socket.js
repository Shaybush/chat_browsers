import React from 'react'

export default function Socket() {
  return (
    <div className="container">
    <h1>Socket React test</h1>
    <form id="id_form" className="col-md-4 d-flex align-items-center">
      <label>Message:</label>
      <input className="form-control" id="id_input" />
      <button className="btn btn-dark">Send</button>
    </form>
    <div className="border col-md-4 mt-3 p-2" style={{minHeight: "400px"}} id="div_message">

    </div>
  </div>
  )
}
