import { ParsedTypedDataV1SignatureRequest } from "../../../signature/types";
import Stack from "../../layout/Stack";
import { Hero } from "../../common/Hero";
import { MessageCard } from "../common/MessageCard";

type SignTypedDataV1ComponentProps = {
  sig: ParsedTypedDataV1SignatureRequest;
};

export const SignTypedDataV1Component = ({
  sig,
}: SignTypedDataV1ComponentProps) => {
  return (
    <Stack space="5x">
      <Hero header={"Sign a Message"} />
      <MessageCard
        variant={"mono"}
        message={sig.formattedJsonString || sig.raw.params[1]}
      />
    </Stack>
  );
};
