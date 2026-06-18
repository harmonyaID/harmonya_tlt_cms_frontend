import { Link } from 'react-router'

const Page403Layout = ({ to = '/' }) => {
    return (
        <div className="box-h-100 d-flex">
            <div className="row d-flex justify-content-center align-items-center w-100">
                <div className="col-md-12">
                    <div className="text-center">
                        <h1 className="fw-500">403</h1>
                        <h4 className="fw-500">
                            Access Denied – You don’t have permission to access
                        </h4>
                        <p className="text-center mb-5 fw-400 text-neutral-300">
                            Please ensure that you have logged in with an
                            account that has sufficient permissions, or contact
                            the system administrator if you believe this is an
                            error.
                        </p>

                        <Link to={to} className="btn btn-primary-brand">
                            Back To Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page403Layout
