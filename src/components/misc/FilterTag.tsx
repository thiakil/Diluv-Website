import React from "react";
import { SelectData } from "../../interfaces";

export function FilterTag({ tagName, tagSlug, tagFilter, setTagFilter }: { tagName: string, tagSlug: string, tagFilter: SelectData[], setTagFilter: Function }) {
    function hasTag() {
        let hasTag = false;
        for (let data of tagFilter) {
            if (data.value === tagSlug) {
                hasTag = true;
            }
        }
        return hasTag;
    }

    function onClick() {
        let newData = tagFilter;
        if (!hasTag())
            newData = newData.concat({ value: tagSlug, label: tagName });
        setTagFilter(newData);
    }

    return <div
        className={`cursor-pointer inline-block bg-gray-200 dark:bg-dark-500 px-3 py-1 text-sm font-semibold text-gray-700 dark:text-dark-100 `}
        onClick={onClick}>
        <span>{tagName}</span>

    </div>;
}


export function DisplayTag({ tagName, tagSlug }: { tagName: string, tagSlug: string }) {
    return <div
        className={`inline flex cursor-default px-2 align-middle bg-hsl-100 dark:bg-hsl-800 hover:bg-tag dark-hover:bg-tag-dark text-hsl-800 dark:text-dark-100 `}>
        <span>{tagName}</span>

    </div>;
}