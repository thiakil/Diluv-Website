import React from "react";
import { Project, SelectData } from "../../interfaces";
import Link from "next/link";
import { FilterTag } from "../misc/FilterTag";
import HourGlass from "../icons/HourGlass";
import Tippy from "@tippyjs/react";
import { followCursor } from "tippy.js";
import Time from "../icons/Time";
import ChartBar from "../icons/ChartBar";
import { listContributors } from "../../utils/util";
import formatDistance from "date-fns/formatDistance";
import format from "date-fns/format";

interface Props {
    gameSlug: string
    projectTypeSlug: string
    project: Project
    setTagFilter: Function
    tagFilter: SelectData[]
}


function getDownloadsTip(downloads: number) {
    return <div className={`bg-gray-800 border border-gray-900 dark:border-dark-100 text-white opacity-90 p-1 text-center`}>
        <p>
            {downloads} Downloads
        </p>
    </div>;
}

function getCreatedTip(createdAt: number) {
    return <div className={`bg-gray-800 border border-gray-900 dark:border-dark-100 text-white opacity-90 p-1 text-center`}>
        <p>
            Created On
        </p>
        <p>${format(createdAt, "yyyy-MM-dd HH:mm:ss")}</p>
    </div>;
}

function getUpdatedTip(updatedAt: number) {
    return <div className={`bg-gray-800 border border-gray-900 dark:border-dark-100 text-white opacity-90 p-1 text-center`}>
        <p>
            Updated On
        </p>
        <p>${format(updatedAt, "yyyy-MM-dd HH:mm:ss")}</p>
    </div>;
}

function ProjectCard({ gameSlug, projectTypeSlug, project, tagFilter, setTagFilter }: Props) {
    let projectUrlRef = `/games/[GameSlug]/[ProjectType]/[ProjectSlug]`;
    let projectUrl = `/games/${gameSlug}/${projectTypeSlug}/${project.slug}`;
    return <>
        <div className="overflow-hidden shadow-lg bg-white dark:bg-dark-800 flex">
            <Link href={projectUrlRef} as={projectUrl}>
                <a className="flex-none">
                    <img src={project.logo} className={`w-full`}/>
                </a>
            </Link>
            <div className="px-6 py-4 flex-grow">
                <div className="mb-2 flex">
                    <div className={`flex-grow`}>
                        <Link href={projectUrlRef} as={projectUrl}>
                            <a>
                                <span className="font-bold text-xl">{project.name}</span>
                            </a>
                        </Link>
                        <div className={`text-gray-600 dark:text-dark-400`}>
                            <span>
                                {`by `}
                            </span>
                            {listContributors(project)}
                        </div>
                    </div>
                    <div className="flex-none">
                        {project.tags.map((value, i) => <div
                            className={`ml-2 inline-block`} key={value.slug}>
                            <FilterTag tagSlug={value.slug} tagName={value.name} tagFilter={tagFilter}
                                       setTagFilter={setTagFilter}/></div>)}
                    </div>
                </div>

                <p className="mb-2"> {project.summary}</p>

                <div className="grid grid-cols-3 gap-4">
                    <div className={``}>
                        <div className={`flex cursor-default`}>
                            <Tippy content={getDownloadsTip(project.downloads)} followCursor={true} plugins={[followCursor]} duration={0}
                                   hideOnClick={false}>

                                <div className={`inline-flex`}>
                                    <ChartBar className={`fill-current mr-1 my-auto`} width={`1rem`} height={`1rem`}/>
                                    <span className={`mr-1`}>
                                        {project.downloads}
                                    </span>
                                </div>

                            </Tippy>
                        </div>
                    </div>

                    <div className={``}>

                        <div className={`flex cursor-default`}>
                            <Tippy content={getCreatedTip(project.createdAt)} followCursor={true} plugins={[followCursor]} duration={0}
                                   hideOnClick={false}>
                                <div className={`inline-flex`}>
                                    <HourGlass className={`fill-current mr-1 my-auto`} width={`1rem`} height={`1rem`}/>
                                    <span className={``}>
                                        {formatDistance(project.createdAt, new Date(), { addSuffix: true })}
                                    </span>
                                </div>
                            </Tippy>
                        </div>

                    </div>
                    <div className={``}>

                        <div className={`flex cursor-default`}>
                            <Tippy content={getUpdatedTip(project.updatedAt)} followCursor={true} plugins={[followCursor]} duration={0}
                                   hideOnClick={false}>
                                <div className={`inline-flex`}>
                                    <Time className={`fill-current mr-1 my-auto`} width={`1rem`} height={`1rem`}/>
                                    <span className={``}>
                                        {formatDistance(project.updatedAt, new Date(), { addSuffix: true })}
                                    </span>
                                </div>
                            </Tippy>
                        </div>

                    </div>

                </div>

            </div>


        </div>
    </>;
}

function getTagArea(index: number) {
    // Not bad / stupid code, tailwind requires the full classname to be able to purge
    switch (index) {
        case 0:
            return `area-tag1`;
        case 1:
            return `area-tag2`;
        case 2:
            return `area-tag3`;
        case 3:
            return `area-tag4`;

    }
}

export default ProjectCard;
