"use client";

import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { Search } from "lucide-react";

function SearchBar({ searchedValue = "", setKeywordStr }: { searchedValue?: string; setKeywordStr?: Dispatch<SetStateAction<string | null>> }) {
  const [searchValue, setSearchValue] = useState(searchedValue);
  const navigate = useRouter();

  return (
    <>
      <div className="flex gap-1 items-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="contents"
        >
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.currentTarget.value)}
            className="flex-1 p-2 my-2 border-b border-accentgold"
            placeholder="이름, 맛, 카테고리 등으로 검색해 보세요!"
          />
          <button
            type="submit"
            onClick={() => {
              if (setKeywordStr) {
                setKeywordStr(searchValue);
              } else {
                navigate.push(`/menus/bread-pedia/search?keyword=${searchValue.trim()}`);
              }
            }}
          >
            <Search color="var(--color-primary)" />
          </button>
        </form>
      </div>
    </>
  );
}

export default SearchBar;
