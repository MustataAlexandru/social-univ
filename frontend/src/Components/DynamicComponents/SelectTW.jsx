import {Select, Option} from "@material-tailwind/react";

import {Label} from "flowbite-react";

export function SelectTW({data, value, onChange ,title}) {

    console.log(value);
    console.log(data)

    return (
        <div className="">
            <Label for='seleci?t' className='text-center'><p className='text-black dark:text-gray-400 mb-2'>{title}</p></Label>
            <Select className='dark:text-white dark:border-gray-600' label='' color="green" style={{}} animate={{
                mount: {y: 0},
                unmount: {y: 25},
            }}
                    value={value}
                    onChange={(e) => onChange(e)}
                    required
            >
                {
                    data.map(item => {
                        return <Option value={item.cat_id} key={item.cat_id} style={{fontSize: '14px',}}
                                       className=' border-gray-200 dark:text-white'><p
                            className={`text-center ${value === item.cat_id ? 'text-green-500 dark:text-green-400' : 'text-gray-400'}`}>
                            <strong>{item.cat_title}</strong></p></Option>
                    })
                }
            </Select>
        </div>
    );
}
