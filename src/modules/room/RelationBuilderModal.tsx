import React, { useContext, useEffect, useState } from "react";
import { useTypeSafeTranslation } from "../../shared-hooks/useTypeSafeTranslation";
import { Button } from "../../ui/Button";
import { Modal } from "../../ui/Modal";
import { Form, Formik } from "formik";
import { ButtonLink } from "../../ui/ButtonLink";
import { InputField } from "../../form-fields/InputField";
import { ModeContext } from "../../mode_context/room_mode";
import { MainContext } from "../../api_context/api_based";

export const RelationBuilderModal: React.FC<{}> = ({}) => {
    type RelationCondition = {
        device_name: String;
        field_name: String;
        field_value: String;
    };
    const {
        relation_builder_open,
        set_relation_builder_open,
        current_action_for_relation,
        current_device_name_for_relation,
    } = useContext(ModeContext);
    const { client, user } = useContext(MainContext);
    const [relations, set_relations] = useState<Map<String, RelationCondition>>(
        new Map()
    );
    const [finished, set_finished] = useState<boolean>(false);
    return (
        <Modal
            isOpen={relation_builder_open}
            onRequestClose={() => {
                set_relation_builder_open(false);
            }}
        >
            <Formik
                initialValues={{
                    device_name: "",
                    field_name: "",
                    field_value: "",
                }}
                validateOnChange={false}
                validate={() => {}}
                onSubmit={(data) => {
                    if (!finished) {
                        set_relations((prev) => {
                            prev.set(
                                `${data.device_name}-${data.field_name}-${data.field_value}`,
                                data
                            );
                            return prev;
                        });
                        set_relation_builder_open(false);
                        set_relation_builder_open(true);
                    } else {
                        set_relation_builder_open(false);
                        set_finished(false);
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form className={`flex-col w-full`}>
                        <h4 className={`mb-2 text-primary-100`}>
                            Generate Relation
                        </h4>
                        <h5 className={`mb-3 text-primary-100`}>
                            {`The Relate Device->${current_device_name_for_relation}`}
                        </h5>
                        <h5 className={`mb-3 text-primary-100`}>
                            {`The Relate Action->${current_action_for_relation}`}
                        </h5>
                        <InputField
                            className={`mb-4`}
                            errorMsg={"Issue with device name"}
                            label={"Condition Device Name"}
                            name="device_name"
                        />
                        <InputField
                            className={`mb-4`}
                            errorMsg={"Issue with field name"}
                            label={"Condition Field Name"}
                            name="field_name"
                        />
                        <InputField
                            className={`mb-4`}
                            errorMsg={"Issue with field name"}
                            label={"Condition Field Value"}
                            name="field_value"
                        />
                        <div className={`flex pt-2 items-center`}>
                            <Button
                                loading={false}
                                type="submit"
                                className={`mr-3`}
                            >
                                {"Add"}
                            </Button>
                            <ButtonLink
                                type="button"
                                type="submit"
                                onClick={() => {
                                    set_finished(true);
                                }}
                            >
                                {"Finish"}
                            </ButtonLink>
                        </div>
                    </Form>
                )}
            </Formik>
            {Array.from(relations.keys()).map((data) => {
                return (
                    <>
                        <div
                            className={`flex border-b border-solid w-full py-4 px-2 items-center`}
                            key={data}
                        >
                            <div className={`flex ml-4 flex-1 mr-4`}>
                                <h4
                                    className={`flex  text-primary-100 font-bold `}
                                >
                                    DN:{relations.get(data)!!.device_name}
                                </h4>
                            </div>
                            <div className={`flex ml-4 flex-1 mr-4`}>
                                <h4
                                    className={`flex  text-primary-100 font-bold`}
                                >
                                    FV:{relations.get(data)!!.field_value}
                                </h4>
                            </div>
                            <div className={`flex ml-4 flex-1 mr-4`}>
                                <h4
                                    className={`flex  text-primary-100 font-bold`}
                                >
                                    FN:{relations.get(data)!!.field_name}
                                </h4>
                            </div>
                            <Button
                                loading={false}
                                onClick={() => {}}
                                size={`small`}
                            >
                                Remove
                            </Button>
                        </div>
                    </>
                );
            })}
        </Modal>
    );
};
