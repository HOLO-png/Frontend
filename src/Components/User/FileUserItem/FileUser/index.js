/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Radio, Row, Col, DatePicker } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

import UploadFileImg from './UploadFileImg';
import ChangePhoneNumber from './ChangePhoneNumber';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../../../Store/Reducer/authReducer';
import { updateProfileUser } from '../../../../Store/Reducer/authReducer';

import moment from 'moment';
import { isEmptyObject } from '../../../../utils';

const dateFormat = 'YYYY/MM/DD';

const FileUserContent = styled.div`
    .file-user-title {
        margin-left: 40px;
    }
    .file-user-name {
        font-size: 23px;
        margin: 0;
    }
    .file-user-des {
        font-weight: 300;
        color: #aeaeae;
    }
    .user-name {
        margin: 0;
    }
    .ant-row.ant-form-item {
        margin: 10px;
    }
    .date-title {
        font-size: 16px;
        color: #969696;
        font-weight: 600;
        margin: 5px 10px;
    }
`;
function FileUser({axiosJWT}) {
    const [loadings, setLoadings] = useState(false);
    const [dataUser, setDataUser] = useState({
        username: '',
        gender: '',
        dateOfBirth: '',
        profilePicture: '',
        phoneNumber: '',
    });
    const dispatch = useDispatch();
    const auth = useSelector(authSelector);

    const { user } = auth;

    const enterLoading = () => {
        setLoadings(true);
        setTimeout(() => {
            let o = Object.fromEntries(
                Object.entries(dataUser).filter(([_, v]) => v !== ''),
            );
            dispatch(updateProfileUser({ tokenAuth: auth.tokenAuth, data: o, axiosJWT }));

            setDataUser({
                username: '',
                gender: '',
                dateOfBirth: '',
                profilePicture: '',
                phoneNumber: '',
            });
            setLoadings(false);
        }, 2000);
    };

    const onChangeDate = (date, dateString) => {
        setDataUser({ ...dataUser, dateOfBirth: dateString });
    };

    const onChangeSex = (e) => {
        setDataUser({ ...dataUser, gender: e.target.value });
    };

    const onChangeInputName = (e) => {
        setDataUser({ ...dataUser, username: e.target.value });
    };

    const importImg = (img) => {
        setDataUser({ ...dataUser, profilePicture: img });
    };

    const onChangePhoneNumber = (e) => {
        setDataUser({ ...dataUser, phoneNumber: e.target.value });
    };

    return (
        <FileUserContent>
            <div className="file-user-title">
                <p className="file-user-name">H??? S?? C???a T??i</p>
                <p className="file-user-des">
                    Qu???n l?? th??ng tin h??? s?? ????? b???o m???t t??i kho???n
                </p>
            </div>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={16}>
                    <div className="file-user-content">
                        <Form
                            labelCol={{
                                span: 6,
                            }}
                            wrapperCol={{
                                span: 18,
                            }}
                            layout="horizontal"
                            size="large"
                        >
                            <Form.Item
                                label="T??n ????ng Nh???p"
                                style={{ margin: 0, fontSize: '16px' }}
                            >
                                <p className="user-name">{user.username}</p>
                            </Form.Item>
                            <Form.Item label="T??n">
                                <Input
                                    onChange={onChangeInputName}
                                    placeholder="Nh???p ?????y ????? h??? t??n..."
                                />
                            </Form.Item>
                            <Form.Item label="Email">
                                <Input value={user.email} />
                            </Form.Item>
                            <Form.Item label="T??n Shop">
                                <Input
                                    defaultValue="Vo Danh Shop"
                                    value={user.username + ' SHOP'}
                                    placeholder="Nh???p t??n Shop"
                                />
                            </Form.Item>

                            <ChangePhoneNumber
                                phoneNumber={user.phoneNumber}
                                onChangePhoneNumber={onChangePhoneNumber}
                            />
                            <Form.Item label="Ng??y Sinh">
                                <DatePicker
                                    onChange={onChangeDate}
                                    defaultValue={moment(
                                        user.dateOfBirth,
                                        dateFormat,
                                    )}
                                    format={dateFormat}
                                />
                            </Form.Item>

                            <Form.Item label="Gi???i T??nh">
                                <Radio.Group
                                    onChange={onChangeSex}
                                    defaultValue={user.gender}
                                >
                                    <Radio value={'male'}>Nam</Radio>
                                    <Radio value={'female'}>N???</Radio>
                                    <Radio value={'orther'}>Kh??c</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Button
                                type="primary"
                                loading={loadings}
                                onClick={enterLoading}
                                size="large"
                                icon={<SaveOutlined />}
                                style={{ marginLeft: '144px' }}
                                disabled={isEmptyObject(dataUser)}
                            >
                                L??u
                            </Button>
                        </Form>
                    </div>
                </Col>
                <Col
                    className="gutter-row"
                    span={8}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <UploadFileImg
                        photoURL={user.profilePicture}
                        importImg={importImg}
                    />
                </Col>
            </Row>
        </FileUserContent>
    );
}

FileUser.propTypes = {};

export default FileUser;
