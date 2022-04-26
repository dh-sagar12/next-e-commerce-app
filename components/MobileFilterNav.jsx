import { useState } from 'react'
import { Listbox } from '@headlessui/react'
import { BsCheck2 } from 'react-icons/bs'
import { HiSelector } from 'react-icons/hi'
import { GrFilter } from 'react-icons/gr'

const filters = [
    { name: 'Best Choice' },
    { name: 'Price Low to High' },
    { name: 'Price High to Low' },
]

const MobileFilterNav = () => {
    const [selected, setSelected] = useState(filters[0])
    const [showFilter, setShowFilter] = useState(false);


    const toogleFilternav = () => {
        setShowFilter(!showFilter
        )
        console.log(showFilter);
    }


    return (
        <>
            <div className=" flex flex-row items-center justify-between px-3 my-2 sm:px-7 bg-purple-100 ">
                <div className=" max-w-max">
                    <Listbox value={selected} onChange={setSelected}>
                        <div className=" py-2">
                            <Listbox.Button className="relative w-full py-2  px-10 text-left bg-white rounded-lgcursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-purple-500 focus-visible:ring-offset-2 focus-visible:border-purple-300 sm:text-sm border border-purple-100 ">
                                <span className="block truncate">{selected.name}</span>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <HiSelector
                                        className="w-5 h-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Listbox.Button>

                            <Listbox.Options className="absolute w- py-1 mt-1 overflow-auto  text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black z-10 ring-opacity-5 focus:outline-none sm:text-sm">
                                {filters.map((filter, filterIdx) => (
                                    <Listbox.Option
                                        key={filterIdx}
                                        className={({ active }) =>
                                            `cursor-default select-none relative py-2 pl-10 pr-4 ${active ? 'text-purple-600 bg-purple-100' : 'text-gray-900'
                                            }`
                                        }
                                        value={filter}
                                    >
                                        {({ selected }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {filter.name}
                                                </span>
                                                {selected ? (
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600">
                                                        <BsCheck2 className="w-5 h-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </div>
                    </Listbox>
                </div>
                <div className="filter-btn hover:text-purple-500 cursor-pointer" onClick={toogleFilternav}>
                    <GrFilter />
                </div>
            </div>
            <SideNavFilter toogleFilternav={toogleFilternav} showFilter={showFilter}/>


        </>

    )
}



const SideNavFilter = (params) => {
    return (
        <>
            <div className={params.showFilter?`absolute top-0 right-0 z-20 h-screen  w-3/4 bg-slate-50 shadow-2xl rounded-md duration-100`:` duration-200 `}>
                <div className={params.showFilter?`item-end flex`:`hidden`}>
                    <button onClick={params.toogleFilternav}>Close</button>
                </div>
            </div>
        </>
    )
}

export default MobileFilterNav;