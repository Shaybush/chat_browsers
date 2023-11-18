import React from 'react';

const LoaderSpinnerCircle = ({ color = 'text-dark' }) => {
  return (
    <div class={`spinner-border ${color}`} role="status">
      <span class="sr-only">Loading...</span>
    </div>
  );
};

export default LoaderSpinnerCircle;