import React from 'react';

function FormError({ error }: { error: any }) {
  if (Array.isArray(error)) {
    const idx = error.findIndex((item) => item !== undefined);
    return (
      <p className="label-text mt-2 text-red-400">{error[idx].text.message}</p>
    );
  }

  return <p className="label-text mt-2 text-red-400">{error.message}</p>;
}

export default FormError;
