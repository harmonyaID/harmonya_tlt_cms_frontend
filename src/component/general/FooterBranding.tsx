import { Link } from 'react-router'

const FooterBranding = () => (
    <div className="w-100 py-4 border-top mt-auto">
        <div className="row g-2 text-neutral-200P text-black-50 small-text text-secondary-brand">
            <div className="col-12 col-md">© 2026 TLT - CRM Traveller</div>
            <div className="col-auto">
                <div className="">
                    Design & Development By{' '}
                    <Link
                        to="https://www.harmonya.id/"
                        className="fs-12 text-primary"
                        target="_blank">
                        Harmonya
                    </Link>
                </div>
            </div>
        </div>
    </div>
)

export default FooterBranding
