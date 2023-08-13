import { useFormik } from 'formik';
import * as Yup from "yup"
import { Node } from 'reactflow';
import { Button } from '@mui/material';

type Props = {
    selectedNode: Node,
    updateNode: (index: number, media_value: string, media_type?: string) => void,
    setDisplayNodeUpdateModal: React.Dispatch<React.SetStateAction<boolean>>
}

function UpdateNodeForm({ updateNode, selectedNode, setDisplayNodeUpdateModal }: Props) {
    const formik = useFormik({
        initialValues: {
            index: selectedNode.data.index || 1,
            media_type: selectedNode.data.media_type,
            media_value: selectedNode.data.media_value || "message"
        },
        validationSchema: Yup.object({
            index: Yup.number().required("this is required"),
            media_value: Yup.string()
                .required("this is required"),
            media_type: Yup.string()
                .required("this is required")
        }),
        onSubmit: (values: {
            index: number,
            media_type: string,
            media_value: string
        }) => {
            updateNode(values.index, values.media_value, values.media_type)
            setDisplayNodeUpdateModal(false)
        },
    });
    return (
        <form onSubmit={formik.handleSubmit} className='shadow w-100 p-3 bg-body-tertiary border border-1 rounded bg-light align-self-center'>
            <h1 className="d-block fs-4 text-center">Update Node</h1>


            <input placeholder="Message or Media Url"
                {...formik.getFieldProps('media_value')}
            />
            <p>{formik.touched.media_value && formik.errors.media_value ? formik.errors.media_value : ""}</p>

            <input placeholder="Message or Media Url"
                {...formik.getFieldProps('index')}
            />
            <p>{formik.touched.index && formik.errors.index ? formik.errors.index : ""}</p>

            <select  {...formik.getFieldProps('media_type')}>
                <option value="message">Message</option>
                <option value="media">Media</option>
            </select>
            <p className='pl-2 text-muted'>{formik.touched.media_type && formik.errors.media_type ? formik.errors.media_type : "videos,gifts and stickers not supported"}</p>
            <Button variant="contained" className='w-100' type="submit"
            >Update</Button>
        </form>
    )
}

export default UpdateNodeForm

