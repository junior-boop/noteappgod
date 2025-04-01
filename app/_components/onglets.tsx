import { Text } from "@/components/Themed";
import { convert } from "@/constants/others";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

export default function Onglet({ label }: { label: string }) {
    const [active, setActive] = useState(false);
    return (
        <TouchableOpacity
            style={{
                height: convert(42),
                justifyContent: "center",
                position: "relative",
            }}>
            <Text fontWeight='500' style={{ color: "#444" }}>
                {label}
            </Text>
            {active && (
                <View
                    style={{
                        height: 2,
                        width: "100%",
                        position: "absolute",
                        backgroundColor: "black",
                        bottom: 0,
                    }}></View>
            )}
        </TouchableOpacity>
    );
}