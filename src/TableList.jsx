import { Table } from 'antd';

const columns = [
    {
        title: 'Название поста',
        dataIndex: 'namePost',
        key: 'namePost',
    },
    {
        title: 'Описание поста',
        dataIndex: 'descriptionPost',
        key: 'descriptionPost',
    },
	{
		title: 'Удаление поста',
		dataIndex: 'buttonDeletePost',
		key: 'buttonDeletePost'
	}
];

const TableList = (props) => {
    return <Table pagination={{pageSize:5}} columns={columns} dataSource={props.dataTable} loading={props.postState}></Table>;
};

export default TableList;
