import { Select, Form, Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import axios from 'axios'
import { useEffect, useState } from 'react';

export const AddQuestion = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  return (
    <Modal
      visible={visible}
      title="Create a new Question"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form {...layout} form={form} name="form_in_modal" initialValues={{ modifier: 'public', }} >
        <Form.Item
          name="question"
          label="Question"
          rules={[{ required: true, message: 'Please enter the question!', }]}
        >
          <Input name='question' size='large' placeholder='Enter the question' />
        </Form.Item>

        <Form.Item
          name="choise1"
          label="A"
          rules={[{ required: true, message: 'Please enter the choise 1!', }]}
        >
          <Input name='choise1' size='small' placeholder='Choise 1' />
        </Form.Item>
        <Form.Item
          name="choise2"
          label="B"
          rules={[{ required: true, message: 'Please enter the choise 2!', }]}
        >
          <Input name='choise2' size='small' placeholder='Choise 2' />
        </Form.Item>
        <Form.Item
          name="choise3"
          label="C"
          rules={[{ required: true, message: 'Please enter the choise 3!', }]}
        >
          <Input name='choise3' size='small' placeholder='Choise 3' />
        </Form.Item>
        <Form.Item
          name="choise4"
          label="D"
          rules={[{ required: true, message: 'Please enter the choise 4!', }]}
        >
          <Input name='choise4' size='small' placeholder='Choise 4' />
        </Form.Item>
        <Form.Item
          name="answer"
          label="Answer"
          rules={[{ required: true, message: 'Please enter the answer!', }]}
        >
          <Input name='answer' size='large' placeholder='Answer' />
        </Form.Item>

      </Form>
    </Modal>
  );
};

export const AddTestQuestion = ({ visible, onCreate, onCancel }) => {
  const [data, setData] = useState([])

  useEffect(async () => {
    await axios.get('/getquestions').then(res => {
      setData(res.data);
    })
  }, []);
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  return (
    <Modal
      visible={visible}
      title="Add a new Question"
      okText="Add"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form {...layout} form={form} name="form_in_modal" initialValues={{ modifier: 'public', }} >
        <Form.Item
          name="questionId"
          label="Question"
          rules={[{ required: true, message: 'Please select the question!', }]}
        >
          <Select
            placeholder="Select a question"
            allowClear
          >
            {data.map(item => {
              return <Select.Option value={item._id}>{item.question}</Select.Option>
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const AddTest = ({ visible, onCreate, onCancel }) => {
  const [test, setTest] = useState({ name: '' })
  const handleChange = (e) => {
    setTest({
      name: e.target.value
    })
  }
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  return (
    <Modal
      visible={visible}
      title="Create a new Test"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form {...layout} form={form} name="form_in_modal" initialValues={{ modifier: 'public', }} >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter the name of teast!', }]}
        >
          <Input name='name' onChange={handleChange} size='large' placeholder='Enter the name of teast' />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const AddUser = ({ visible, onCreate, onCancel }) => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const handleChange = (e) => {
    setData(prevState => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  return (
    <Modal
      visible={visible}
      title="Create a new User"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form {...layout} form={form} name="form_in_modal" initialValues={{ modifier: 'public', }} >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter the name!', }]}
        >
          <Input name='name' onChange={handleChange} size='large' placeholder='Enter the name' />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[{ required: true, message: 'Please enter the email!', }]}
        >
          <Input name='email' onChange={handleChange} type='email' size='large' placeholder='Enter the email' />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please enter the password!', }]}
        >
          <Input name='password' onChange={handleChange} size='large' placeholder='Enter the password' />
        </Form.Item>
      </Form>
    </Modal>
  );
};
