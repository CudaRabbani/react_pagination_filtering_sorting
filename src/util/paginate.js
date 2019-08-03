import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;

    return _(items).slice(startIndex).take(pageSize).value();
    /*
    first of all we have to convert the items in lodash wrapper,
    then we have to start slicing from the startIndex and we will take the pageSize
    items and again convert them back to regular values
     */
};