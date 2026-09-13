import FormInput from '@/component/form/FormInput.tsx'
import FormTextArea from '@/component/form/FormTextArea.tsx'
import FormTinyMCE from '@/component/form/FormTinyMCE.tsx'
import FormUploadFile from '@/component/form/FormUploadFile.tsx'

const uiFormConfig = {
    title: {
        label: 'Title',
        Component: (props) => <FormInput {...props} />,
    },
    description: {
        label: 'Title',
        Component: (props) => <FormTextArea {...props} />,
    },
    content: {
        label: 'Content',
        Component: (props) => <FormTinyMCE {...props} />,
    },
    image: {
        label: 'Image',
        Component: (props) => <FormUploadFile {...props} />,
    },
    backgroundImage: {
        label: 'Background Image',
        Component: (props) => <FormUploadFile {...props} />,
    },
    buttonLink: {
        label: 'Button Link',
        Component: (props) => <FormInput {...props} />,
    },
    buttonText: {
        label: 'Button Text',
        Component: (props) => <FormInput {...props} />,
    },
}

export default uiFormConfig
