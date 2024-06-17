import { useEffect, useState } from 'react';
import './service/firebase/firebase';
import { addPostService } from './service/postsServices/addPost';
import { Button, Form, Input } from 'antd';
import TableList from './TableList';
import { readPostService } from './service/postsServices/readPosts';
import { setPosts } from './service/postsServices/readPosts';
import { DeletePostService } from './service/postsServices/deletePost';

function App() {
    const [postState, setPostState] = useState(true);
	const [dataTable, setDataTable] = useState([]);

    const AddPost = async (data) => {
		await addPostService(data.namePost, data.descriptionPost);
		form.resetFields();

		setPostState(true);
    };

	const handleDeletePost = async (data) => {
		await DeletePostService(data);
		setPostState(true);
	}

    const DataPreRender = async () => {
		console.log('render');
        await readPostService();
		
		if(postState) {
			setPostState(false);
		}

		setDataTable(setPosts.data.map((item, index) => {
			return {
				key: item.id,
				namePost: item.el.name,
				descriptionPost: item.el.description,
				buttonDeletePost: <Button key={`BUTTON_${item.id}`} id={item.id} onClick={() => handleDeletePost(item.id)} danger className='px-4 rounded-full'>Удалить</Button>
			}
		}));
    };

    useEffect(() => {
		DataPreRender();
	}, [postState]);

	const [form] = Form.useForm();

    return (
        <div className='w-screen px-[15%] flex flex-col gap-10'>
            <Form
				form={form}
                name='createField'
                autoComplete='off'
                onFinish={AddPost}
                layout='vertical'
            >
                <Form.Item
                    name='namePost'
                    label='Название поста'
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            min: 3,
                            max: 16,
                        },
                    ]}
                >
                    <Input placeholder='Введите название поста' />
                </Form.Item>

                <Form.Item
                    name='descriptionPost'
                    label='Описание поста'
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            min: 3,
                            max: 128,
                        },
                    ]}
                >
                    <Input.TextArea
                        rows={4}
                        placeholder='Введите описание поста...'
                    />
                </Form.Item>

                <Button type='primary' size='large' block htmlType='submit'>
                    Создать
                </Button>
            </Form>

			<TableList postState={postState} setPostState={setPostState} dataTable={dataTable} setDataTable={setDataTable}/>
        </div>
    );
}

export default App;
