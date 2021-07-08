import useCustomer from '@framework/customer/use-customer';
import { Layout } from '@components/common';
import { Container } from '@components/ui';

export default function Profile() {
  const { data } = useCustomer();
  return (
    <Container>
      <p>My Profile</p>
      {data && (
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-8 pr-4">
            <div>
              <p>Full Name</p>
              <span>
                {data.firstName} {data.lastName}
              </span>
            </div>
            <div className="mt-5">
              <p>Email</p>
              <span>{data.email}</span>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

Profile.Layout = Layout;
