import React, { useState, useContext } from "react";
import { Card, Modal, Button, Input, message, Row, Col } from "antd";
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
    image:
      "https://static.oxinis.com/healthmug/image/product/3159-1-800.webp",
  },
  {
    name: "Eye Glasses (Anti-Blue Light)",
    credits: 30,
    description:
      "Eye glasses are a great way to soothe tired eyes and reduce puffiness. They can also help relieve headaches, sinus pressure, and eye strain.",
    image:
      "https://www.bonlook.ca/cdn/shop/files/Solemn_Black_Front_O_close-up_600x.jpg?v=1692038474"
  },
  {
    name: "Eye Health Supplement",
    credits: 50,
    description:
      "Eye health supplements are a great way to soothe tired eyes and reduce puffiness. They can also help relieve headaches, sinus pressure, and eye strain.",
    image:
      "https://i5.walmartimages.com/seo/Ocuvite-Eye-Health-Formula-Eye-Vitamin-Mineral-Supplement-with-Lutein-Zeaxanthin-and-Omega-3-from-Bausch-Lomb-30-Soft-Gels_00d8691a-2dde-48de-a9ad-29ebd8383a4e.3ea744201b9a3544c04e78821a621560.jpeg",
  },
  {
    name: "Eye Health Mask",
    credits: 100,
    description:
      "Eye masks are a great way to soothe tired eyes and reduce puffiness. They can also help relieve headaches, sinus pressure, and eye strain.",
    image:
      "https://m.media-amazon.com/images/I/81IdZuJmcOL.jpg",
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
  const [address, setAddress] = useState("");

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
      message.success("Congratulations on your redemption!");
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
          <HomeOutlined
            className="text-xl text-gray-800 font-extrabold mb-10 hover:scale-150 transition-transform duration-300"
            onClick={() => (window.location.href = "/home")}
          />
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
                    className="rounded-t-lg"
                  />
                }
                actions={[
                  <button
                    className="rounded-full bg-gradient-to-r from-[#9575CD] to-[#64B5F6] text-white font-bold py-2 px-4"
                    onClick={() => redeemProduct(product)}
                    key={product.name}
                  >
                    Redeem {product.credits} credits
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
        title={`Confirm Redemption: ${selectedProduct?.name}`}
        visible={visible}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
        className="rounded-lg transition-all duration-300"
      >
        <p className="mb-4">Confirm your shipping address:</p>
        <Input.TextArea
          rows={4}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
          className="rounded-lg"
        />
      </Modal>
    </div>
  );
};

export default Redemption;
