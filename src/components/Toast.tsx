import React from 'react';

function Toast() {
  return (
    <div className="absolute bottom-5 right-10 flex w-60 items-center justify-center rounded-md bg-slate-50/10 p-3">
      <span className="text-xs font-semibold">Link Copied to Clipboard!</span>
    </div>
  );
}

export default Toast;
