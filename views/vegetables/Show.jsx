const React = require('react')

function Show(props) {
    return (
        <div>
            <h1>{props.vegetable.name}</h1>
            <a href='/vegetables'>Go Back To Index</a>
            <p>
                The {props.vegetable.name} is {props.vegetable.color} and {props.vegetable.readyToEat? 'It Is Ready To Eat': 'It Is Not Ready To Eat'}
            </p>
            <form action={`/vegetables/${props.vegetable._id}?_method=DELETE`} method='POST'>
                <input type="submit" value={`Delete This ${props.vegetable.name}`}/>
            </form>
            <div>
                <a href={`/vegetables/${props.vegetable._id}/edit`}>
                    <button>{`Edit This ${props.vegetable.name}`}</button>
                </a>
            </div>
        </div>
    )
}

module.exports = Show