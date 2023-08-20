import React, { useState, useContext } from "react";
import { Card, Modal, Button, Input, message, Row, Col, Image } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import UserContext from "../../context/userContext";
import { db } from "../../utils/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

const products = [
  {
    name: "Eye Drop",
    credits: 10,
    description:
      "Eye drops for dry eyes and eye strain. The best eye drops for you may depend on what’s drying your eyes out.",
    image: "https://static.oxinis.com/healthmug/image/product/3159-1-800.webp",
  },
  {
    name: "Eye Glasses (Anti-Blue Light)",
    credits: 30,
    description:
      "Anti-blue light glasses are specially made glasses that can be worn to filter out blue light that comes from digital screens.",
    image:
      "https://www.bonlook.ca/cdn/shop/files/Solemn_Black_Front_O_close-up_600x.jpg?v=1692038474",
  },
  {
    name: "Eye Health Supplement",
    credits: 50,
    description:
      "Eye health supplements contain nutrients vital to eye health. The supplements contain antioxidants, vitamins, and minerals.",
    image:
      "https://i5.walmartimages.com/seo/Ocuvite-Eye-Health-Formula-Eye-Vitamin-Mineral-Supplement-with-Lutein-Zeaxanthin-and-Omega-3-from-Bausch-Lomb-30-Soft-Gels_00d8691a-2dde-48de-a9ad-29ebd8383a4e.3ea744201b9a3544c04e78821a621560.jpeg",
  },
  {
    name: "Eye Health Mask",
    credits: 100,
    description:
      "Eye masks have a variety of benefits, from providing relief from headaches and migraines, to reducing puffy eyes and dark circles.",
    image: "https://m.media-amazon.com/images/I/81IdZuJmcOL.jpg",
  },
  {
    name: "Eye Massager",
    credits: 250,
    description:
      "Eye massagers are a great way to soothe tired eyes and reduce puffiness. They can also help relieve headaches, sinus pressure, and eye strain.",
    image:
      "https://i5.walmartimages.com/asr/7939a6a5-42bd-40b3-b2f8-8b17e65da730.36c13ce4931094a260c11e12747492c3.jpeg?odnHeight=2000&odnWidth=2000&odnBg=ffffff",
  },
];

const Redemption = () => {
  const { user, setUser } = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const redeemProduct = async (product) => {
    if (user.optimismCredit >= product.credits) {
      setSelectedProduct(product);
      setVisible(true);
    } else {
      message.error("Insufficient credits for this reward.");
    }
  };

  const handleOk = async () => {
    try {
      // Update user credits in Firestore
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        optimismCredit: user.optimismCredit - selectedProduct.credits,
      });
      // Update user credits in local storage
      const updatedUser = {
        ...user,
        optimismCredit: user.optimismCredit - selectedProduct.credits,
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setVisible(false);
      message.success("Congratulations on your redemption! Your product will be delivered to you shortly. Please check your email for more details.");
    } catch (error) {
      message.error("Error redeeming product.");
    }
  };

  return (
    <div className="p-16 bg-gradient-to-br from-[#9575CD] to-[#64B5F6] min-h-screen">
      <div className="bg-white p-10 rounded-xl shadow-lg">
        <div className="flex justify-between">
          <h1 className="text-4xl text-gray-800 font-extrabold mb-10">
            Rewards
          </h1>
          <div className="flex">
            <div className="flex items-center text-xl text-gray-800 font-semibold mb-10">
              <Image
                width={50}
                src={user?.photoURL}
                className="rounded-full border-4 border-purple-400"
              />{" "}
              &nbsp;&nbsp;
              {user?.optimismCredit} credits
            </div>
            <HomeOutlined
              className="ml-10 text-xl text-gray-800 font-extrabold mb-10 hover:scale-150 transition-transform duration-300 translate-y-[10px]"
              onClick={() => (window.location.href = "/home")}
            />
          </div>
        </div>

        <Row gutter={32}>
          {products.map((product) => (
            <Col span={8} key={product.name}>
              <Card
                hoverable
                style={{ maxWidth: 360 }}
                cover={
                  <img
                    alt={product.name}
                    src={product.image}
                    className="rounded-t-lg h-56 object-cover"
                  />
                }
                actions={[
                  <button
                    className="rounded-full bg-gradient-to-r from-[#9575CD] to-[#64B5F6] text-white font-bold py-2 px-4"
                    onClick={() => redeemProduct(product)}
                    key={product.name}
                  >
                    {product.credits} credits
                  </button>,
                ]}
                className="transition-transform transform hover:scale-105 shadow-md rounded-lg mb-6"
              >
                <Card.Meta
                  title={product.name}
                  description={product.description}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <Modal
        title={`${selectedProduct?.name}`}
        open={visible}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
        className="rounded-lg transition-all duration-300"
        footer={[
          <button
            key="back"
            onClick={() => setVisible(false)}
            className="rounded-full bg-gradient-to-r font-bold py-2 px-4 mr-3"
          >
            Cancel
          </button>,
          <button
            key="submit"
            onClick={handleOk}
            className="rounded-full bg-gradient-to-r from-[#9575CD] to-[#64B5F6] text-white font-semibold py-2 px-4"
          >
            Confirm
          </button>,
        ]}
      >
        <p className="text-gray-600">
          Please enter your detail below to confirm your redemption.
        </p>
        <div className="flex space-x-4">
          <Input placeholder="First Name" className="mt-4" />
          <Input placeholder="Last Name" className="mt-4" />
        </div>
        <Input placeholder="Phone Number" className="mt-4" />
        <Input placeholder="Address" className="mt-4" />
      </Modal>
    </div>
  );
};

export default Redemption;
