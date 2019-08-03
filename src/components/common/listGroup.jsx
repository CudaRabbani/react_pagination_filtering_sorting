import React from 'react';

const ListGroup = (props) => {
    const {items, onItemSelect, textProperty, selectedItem, valueProperty} = props;
    return (
        <ul className="list-group">
            {items.map(item=>(
/*                <li key={item._id}
                    onClick={()=>onItemSelect(item)}
                    className="list-group-item">{item.name}</li>*/
                <li key={item[valueProperty]}
                onClick={()=>onItemSelect(item)}
                className={item === selectedItem ? "list-group-item active" : "list-group-item"}>{item[textProperty]}</li>
            ))}

        </ul>
    );
};

ListGroup.defaultProps = {
    textProperty: "name",
    valueProperty: "_id"
};

export default ListGroup;
