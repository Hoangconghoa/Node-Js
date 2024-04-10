import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  Form,
  Checkbox,
  Input,
  InputNumber,
  FormProps,
  Select,
  Button,
  message,
} from "antd";
import { axiosClient } from "../../library/AxiosClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AnyObject } from "antd/es/_util/type";
interface DataType {
  _id?: string;
  productName: string;
  category: string;
  brandId: string;
  price: number;
  sort: number;
  isActive: boolean;
  description?: string;
  discount: number;
  stock: number;
  modelYear: number;
  thumbnail?: string;
  slug: string;
  isHome?: boolean;
}

const UpdateProduct = () => {
  const navigate = useNavigate();
  const param = useParams();
  const { id } = param;
  // const [pam] = useSearchParams();
  // const page = pam.get("page");
  // const limit = pam.get("limit");
  const [messageApi, contextHoder] = message.useMessage();
  const [updateFormEdit] = Form.useForm();
  const getCategories = async () => {
    return axiosClient.get(`/v1/categories`);
  };
  const queryCategory = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
  const getBrands = async () => {
    return axiosClient.get(`/v1/brands`);
  };
  const queryBrand = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });
  // const brandData = queryBrand.data?.data.data.totalItems;
  console.log(queryBrand.data?.data.data.brands);
  console.log(queryCategory.data?.data.data.categories);

  const fectchUpdate = async () => {
    return axiosClient.get(`/v1/products/:id`);
  };

  const getProduct = async () => {
    return await axiosClient.get(`/v1/products/${id}`);
  };
  const queryProduct = useQuery({
    queryKey: ["product-detail", id],
    queryFn: getProduct,
  });
  //mutation update
  const mutationUpdate = useMutation({
    mutationFn: fectchUpdate,
    onSuccess: () => {
      console.log("Update thanh cong");
      messageApi.open({
        type: "success",
        content: "update success",
      });
      navigate("/v1/products");
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "error",
      });
    },
  });
  const onFinish: FormProps<DataType>["onFinish"] = (values) => {
    console.log(values);
    // mutationUpdate.mutate(values)
  };
  const onFinishFailed: FormProps<DataType>["onFinishFailed"] = (errorinfo) => {
    console.log(errorinfo);
    // mutationUpdate.mutate(values)
  };
  let productData = {};
  if (queryProduct.isSuccess) {
    productData = queryProduct.data.data.data;
  }
  updateFormEdit.setFieldsValue(productData);
  return (
    <div>
      {contextHoder}
      <Button
        type="primary"
        onClick={() => {
          navigate("/products");
        }}
      >
        Products List
      </Button>
      <Form
        form={updateFormEdit}
        name="edit-form"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<DataType>
          label="Product Name"
          name="productName"
          rules={[
            { required: true, message: "Please input product Name!" },
            { min: 4, message: "Tối thiểu 4 kí tự" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<DataType>
          label="URL SEO"
          name="slug"
          rules={[
            { required: true, message: "Please input product slug!" },
            { min: 4, message: "Tối thiểu 4 kí tự" },
          ]}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item<DataType>
          label="Category"
          name="category"
          rules={[
            { required: true, message: "Please input product Category!" },
          ]}
        >
          <Select
            style={{ width: 120 }}
            onChange={() => {}}
            options={
              queryCategory.data &&
              queryCategory.data.data.data.categories.map((c: AnyObject) => {
                return {
                  value: c._id,
                  label: c.categoryName,
                };
              })
            }
          />
        </Form.Item> */}

        {/* <Form.Item<DataType>
          label="Brand"
          name="brandId"
          rules={[{ required: true, message: "Please input product Brand!" }]}
        >
          <Select
            style={{ width: 120 }}
            onChange={() => {}}
            options={
              queryBrand.data &&
              queryBrand.data.data.data.brands.map((c: AnyObject) => {
                return {
                  value: c._id,
                  label: c.brandName,
                };
              })
            }
          />
        </Form.Item> */}

        <Form.Item<DataType>
          hasFeedback
          label="Price"
          name="price"
          rules={[
            { required: false, message: "Please Price" },
            {
              type: "number",
              min: 0,
              message: "Tối thiểu phải là 0",
            },
          ]}
        >
          <InputNumber min={0} defaultValue={0} />
        </Form.Item>

        <Form.Item<DataType>
          hasFeedback
          label="Discount"
          name="discount"
          rules={[
            { required: false, message: "Please discount" },
            {
              type: "number",
              min: 0,
              message: "Tối thiểu phải là 0",
            },
          ]}
        >
          <InputNumber min={0} defaultValue={0} />
        </Form.Item>

        <Form.Item<DataType>
          hasFeedback
          label="Stock"
          name="stock"
          rules={[
            { required: false, message: "Please Stock" },
            {
              type: "number",
              min: 0,
              message: "Tối thiểu phải là 0",
            },
          ]}
        >
          <InputNumber min={0} defaultValue={0} />
        </Form.Item>

        <Form.Item<DataType>
          label="Description"
          name="description"
          rules={[{ max: 500, message: "Tối đa 500 kí tự" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item<DataType>
          hasFeedback
          label="Sort"
          name="sort"
          rules={[
            { required: false, message: "Please sort" },
            {
              type: "number",
              min: 1,
              message: "Tối thiểu phải là 1",
            },
          ]}
        >
          <InputNumber min={0} defaultValue={50} />
        </Form.Item>

        <Form.Item>
          <Form.Item name="isHome" valuePropName="checked" noStyle>
            <Checkbox>is Home</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Form.Item name="isActive" valuePropName="checked" noStyle>
            <Checkbox>Enable</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item<DataType> label="Thumbnail" name="thumbnail">
          <Input />
        </Form.Item>

        <Form.Item hidden label="Id" name="_id">
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={mutationUpdate.isPending}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateProduct;
