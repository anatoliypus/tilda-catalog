import PropTypes from 'prop-types'

export const productType = PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    minPrice: PropTypes.number
})
