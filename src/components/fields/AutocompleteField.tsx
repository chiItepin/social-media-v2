import React, { FunctionComponent, useState } from 'react';

interface IProps {
  type: string;
}

const AutocompleteField: FunctionComponent<IProps> = ({
  type,
}) => {
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <div>
      <input
        type="text"
        placeholder="Search User"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        className="px-3 py-2 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
      />
    </div>
  )
}

export default AutocompleteField;
