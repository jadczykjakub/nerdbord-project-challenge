'use client';

import React from 'react';
import { useFormState } from 'react-dom';
import { handleFormSubmit } from './actions';

export default function Form() {
  const [state, formAction] = useFormState(handleFormSubmit, null);

  return (
    <>
      <form action={formAction}>
        <label htmlFor="my-file">select file to upload</label>
        <input type="file" name="my-file" id="my-file" />
        <button type="submit">upload</button>
      </form>

      {state && <div className="bg-green-600">{state.message}</div>}
    </>
  );
}
