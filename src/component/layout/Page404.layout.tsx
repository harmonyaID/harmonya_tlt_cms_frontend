import { Link } from 'react-router'

const Page404Layout = ({ to = '/' }) => {
    return (
        <div className="box-h-100 d-flex">
            <div className="row d-flex justify-content-center align-items-center w-100">
                <div className="col-md-12">
                    <div className="text-center">
                        <h1 className="fw-500">404</h1>
                        <h4 className="fw-500">Page not found</h4>
                        <p className="text-center mb-5 fw-400 text-neutral-300">
                            The page you were looking for does not exist. You
                            might have been following an old <br />
                            link or misspelled something in the URL.s
                        </p>

                        <Link to={to || ''} className="btn btn-primary-brand">
                            Back To Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page404Layout
