import { Form, Input, Typography } from 'antd';
import { USER_TYPE } from '../../constants';
import { useAppStore } from '../../stores';
import { IUser } from '../../types/common-types';
import TagSelect from '../tag-select';

import './styles.scss';

interface EditJobProps {
  editProfileFormData: Partial<IUser & { confirmPassword: string }>;
  setEditProfileFormData: React.Dispatch<React.SetStateAction<Partial<IUser>>>;
}

const EditJob: React.FC<EditJobProps> = ({
  editProfileFormData,
  setEditProfileFormData
}) => {
  const currentUser = useAppStore((state) => state.currentUser);
  const isRecruiter: boolean =
    currentUser?.userDetails?.type === USER_TYPE.RECRUITER;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditProfileFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const onUserDetailsChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditProfileFormData(
      (prevData) =>
        ({
          ...prevData,
          userDetails: {
            ...prevData.userDetails,
            [e.target.name]: e.target.value
          }
        } as IUser)
    );
  };

  const onTagChange = (value: string[]) => {
    setEditProfileFormData(
      (prevData) =>
        ({
          ...prevData,
          userDetails: {
            ...prevData.userDetails,
            skills: value
          }
        } as IUser)
    );
  };

  return (
    <section className="edit-profile-wrapper">
      <Typography.Title className="title">Edit Profile</Typography.Title>
      <Form
        name="edit-profile"
        layout="vertical"
        initialValues={{
          remember: true,
          name: editProfileFormData.name,
          email: editProfileFormData.email,
          companyName: editProfileFormData.userDetails?.companyName,
          contact: editProfileFormData.userDetails?.contact,
          githubUsername: editProfileFormData.userDetails?.githubUsername,
          location: editProfileFormData.userDetails?.location
        }}
        autoComplete="on"
      >
        <Form.Item label="Name" name="name">
          <Input
            name="name"
            placeholder="* e.g. John Doe"
            value={editProfileFormData.name}
            onChange={onChangeHandler}
            size="large"
            required
          />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input
            type="email"
            name="email"
            placeholder="* e.g. john.doe@xyz.com"
            value={editProfileFormData.email}
            onChange={onChangeHandler}
            size="large"
            required
          />
        </Form.Item>
        <Form.Item label="Company" name="companyName">
          <Input
            name="companyName"
            placeholder="* e.g. Intuit or Paytm"
            value={editProfileFormData.userDetails?.companyName}
            onChange={onUserDetailsChangeHandler}
            size="large"
          />
        </Form.Item>
        <Form.Item label="Contact" name="contact">
          <Input
            name="contact"
            placeholder="* e.g. 8260602123"
            value={editProfileFormData.userDetails?.contact}
            onChange={onUserDetailsChangeHandler}
            size="large"
          />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password
            type="password"
            className="password-input"
            name="password"
            placeholder="Set a password"
            minLength={6}
            value={editProfileFormData.password}
            onChange={onChangeHandler}
            size="large"
            required
          />
        </Form.Item>
        <Form.Item label="Confirm Password" name="confirmPassword">
          <Input.Password
            type="password"
            className="password-input"
            name="confirmPassword"
            placeholder="Retype to confirm"
            minLength={6}
            value={editProfileFormData.confirmPassword}
            onChange={onChangeHandler}
            size="large"
            required
          />
        </Form.Item>
        {!isRecruiter ? (
          <Form.Item label="GitHub Username" name="githubUsername">
            <Input
              name="githubUsername"
              placeholder="* Tell something about the role"
              value={editProfileFormData.userDetails?.githubUsername}
              onChange={onUserDetailsChangeHandler}
              size="large"
            />
          </Form.Item>
        ) : null}
        <Form.Item label="Location" name="location">
          <Input
            name="location"
            placeholder="* e.g. Bengaluru or Remote"
            value={editProfileFormData.userDetails?.location}
            onChange={onUserDetailsChangeHandler}
            size="large"
          />
        </Form.Item>
        {!isRecruiter ? (
          <TagSelect
            onTagChange={onTagChange}
            defaultValue={editProfileFormData.userDetails?.skills ?? []}
          />
        ) : null}
      </Form>
    </section>
  );
};

export default EditJob;
