import React, { useState, useEffect, useContext } from "react";
import {
  Statistic,
  Card,
  Image,
  Row,
  Col,
  Tooltip,
  Space,
  Divider,
  Button,
} from "antd";
import {
  HeartTwoTone,
  SmileTwoTone,
  EyeTwoTone,
  WarningTwoTone,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import UserContext from "../../context/userContext";

const Analytics = () => {
  const [currentUserData, setCurrentUserData] = useState(null);
  const { user } = useContext(UserContext);

  const [isShowingIframe, setIsShowingIframe] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = user?.uid;
      console.log(userId);
      if (userId) {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          setCurrentUserData(userDoc.data());
        }
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="p-16 bg-gradient-to-br from-[#D1C4E9] to-[#BBDEFB] min-h-screen">
      <div className="bg-white p-10 rounded-xl shadow-2xl max-w-5xl mx-auto">
        <Space size="middle" direction="vertical" className="w-full">
          <div className="flex justify-between items-center">
            <Space size="middle">
              <Image
                width={80}
                src={currentUserData?.photoURL}
                placeholder={<UserOutlined />}
                className="rounded-full border-4 border-purple-400"
              />
              <h1 className="text-4xl text-gray-800 font-extrabold">
                {currentUserData?.displayName}
              </h1>
            </Space>
            <div className="flex align-items-center">
              <span className="text-xl text-gray-500 block mr-6">
                {currentUserData?.email}
              </span>
              <HomeOutlined
                className="text-2xl text-gray-800 font-extrabold hover:scale-150 transition-transform duration-300 translate-y-[-3px]"
                onClick={() => (window.location.href = "/home")}
              />
            </div>
          </div>

          <Divider />

          <Row gutter={24} justify="center">
            <Col xs={24} md={12} lg={6}>
              <Card hoverable className="text-center">
                <Statistic
                  title="Health Score"
                  value={currentUserData?.userMetadata?.healthScore || 50}
                  prefix={
                    <HeartTwoTone
                      twoToneColor={
                        currentUserData?.healthScore > 50
                          ? "#34D399"
                          : "#F87171"
                      }
                      className="mr-3 translate-y-[-4.5px]"
                    />
                  }
                  valueStyle={{ fontSize: "24px" }}
                />
              </Card>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <Card hoverable className="text-center">
                <Statistic
                  title="Optimism Credits"
                  value={currentUserData?.optimismCredit}
                  prefix={
                    <SmileTwoTone className="mr-3 translate-y-[-4.5px]" />
                  }
                  valueStyle={{ fontSize: "24px" }}
                />
              </Card>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <Card hoverable className="text-center">
                <Statistic
                  title="Distance from Screen"
                  value={currentUserData?.averageDistance || 34}
                  suffix="cm"
                  prefix={<EyeTwoTone className="mr-3 translate-y-[-4.5px]" />}
                  valueStyle={{ fontSize: "24px" }}
                />
              </Card>
            </Col>
            <Col xs={24} md={12} lg={6}>
              <Card hoverable className="text-center">
                <Statistic
                  title="Posture Warnings"
                  value={currentUserData?.postureWarnings || 0}
                  prefix={
                    <WarningTwoTone
                      twoToneColor="#F87171"
                      className="mr-3 translate-y-[-4.5px]"
                    />
                  }
                  valueStyle={{ fontSize: "24px" }}
                />
              </Card>
            </Col>
          </Row>

          <Divider />

          {/* <Card className="text-center mt-6">
            <Statistic
              title="Statistics"
              value="TBA"
              valueStyle={{ fontSize: "24px" }}
              tooltip={{ title: "This feature will be implemented soon." }}
            />
          </Card>

          <Divider /> */}
          <div className="mx-auto text-center">
            <button
              className="text-center mx-auto rounded-full bg-gradient-to-r font-bold py-2 px-4 mr-3 from-[#9575CD] to-[#64B5F6] text-white hover:scale-110 transition-transform duration-300"
              onClick={() => setIsShowingIframe(!isShowingIframe)}
            >
              Chat with the Eye Elf
            </button>
          </div>

          <iframe
            src="https://app.chatsimple.ai/iframe23/02e532dd-16d0-4e2f-8585-7c83a316a3d7/062fa110-3905-4daf-a013-1440f1fffc06/ad49c39d-393a-4d5f-b209-a7e528b56a90"
            height="450"
            width="750"
            title="Chatsimple"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "20px",
              border: "none",
              borderRadius: "20px",
              boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
              display: isShowingIframe ? "block" : "none",
            }}
          ></iframe>
        </Space>
      </div>
    </div>
  );
};

export default Analytics;
