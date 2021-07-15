import React from 'react';

const SectionTitle = (props) => {
  return (
    <div>
      <h1 className="font-bold text-4xl mb-4">{props.heading}</h1>
      <p>{props.body}</p>
    </div>
  )
}

export default SectionTitle;