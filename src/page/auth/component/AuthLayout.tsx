import FooterBranding from '@/component/general/FooterBranding.tsx'

const AuthLayout = (props: any) => {
    const classBackground =
        new Date().getHours() <= 17 ? 'wp-image' : 'wp-image-night'

    return (
        <>
            <div className="login-wrapper vh-100">
                <div className="row h-100">
                    <div className="col-md-6 col-lg-5 wp-auth Palign-content-around flex-wrap d-flex h-100">
                        {props.children}

                        <FooterBranding />
                    </div>

                    <div className="col-md-6 col-lg-7 position-relative p-3 ps-0">
                        <div
                            className={
                                'w-100 h-100 b-rad-12 d-md-flex align-items-end d-none ' +
                                classBackground
                            }>
                            <div className="w-100 text-white">
                                <h3 className="fw-400 mb-5">
                                    "Manage Smarter. Serve Better. Travel
                                    Further."
                                </h3>
                                <p className="m-0 fw-400 paragraph-16">
                                    - CRM Traveller
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuthLayout
