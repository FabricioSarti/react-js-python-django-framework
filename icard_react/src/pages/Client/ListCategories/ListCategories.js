import React from 'react'
import { Image } from "semantic-ui-react"
import { map } from "lodash"
import "./ListCategories.scss"
import { useResolvedPath, useNavigate } from 'react-router-dom';



export function ListCategories(props) {
    const locationFunct = useResolvedPath();
    const navigate = useNavigate();
    const { categories } = props;

    const goToCategories = (id) => {

        navigate(`${locationFunct.pathname}/${id}`)
    }
    return (
        <div className='list-categories-client'>
            {map(categories, (category) => (
                <div key={category.id} className='list-categories-client__category' onClick={() => goToCategories(category.id)}>
                    <Image src={category.image} size='small' />
                    <span>{category.title}</span>
                </div>
            ))}
        </div>
    )
}
