import { GetServerSideProps } from "next"
import { handle } from "next-runtime"
import {
    CompanyFormData,
    ContactFormData,
    handleEmail,
    formatCompanyForm,
    formatContactForm,
    formatErrorForm,
    ErrorFormData,
} from "../../utils/email"

export const getServerSideProps: GetServerSideProps<
    Record<string, any>,
    { readonly type: "index" | "company" | "error" }
> = (context) => {
    const type = context.params?.type

    switch (type) {
        case "index":
            return handleEmail<ContactFormData>(formatContactForm, "Dotaz na Nauč mě IT")(context)
        case "company":
            return handleEmail<CompanyFormData>(formatCompanyForm, "B2B Nauč mě IT")(context)
        case "error":
            return handleEmail<ErrorFormData>(formatErrorForm, "Nahlášení chyby", "lydie.hemalova@naucme.it")(context)
        default:
            return handle({})(context)
    }
}

// Hack to use next-runtime outside of API routes as they are mess
const NoComponent = () => null
export default NoComponent
