import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { reportsRetrieve, reportsUpdate } from "../../../axios/api-calls";
import {
  Form,
  FormError,
  FormInput,
} from "../../../globals/styles/forms.styles";
import { ModalsContainer } from "../Modals.styles";
import {
  AddMoreButton,
  CustomModalButton,
  SelectImage,
} from "../../../globals/styles/CustomFormComponents";
import Button from "../../Button/Button";

import { useForm, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Loading from "../../Loading/Loading";
import { toast } from "react-toastify";

type detailsObj = {
  header: string;
  value: string;
};

type formInputData = {
  name: string;
  title: string;
  link: any;
  image: any;
  details: detailsObj[];
};

const schema = yup.object({
  name: yup.string().required(),
  title: yup.string().required(),
  image: yup.mixed().required(),
  readmore_link: yup.string().url().notRequired(),
  details: yup
    .array(
      yup.object({
        header: yup.string().required(),
        value: yup.string().required(),
      })
    )
    .min(1, "Please add atleast one header value pair"),
});

const EditReportsModal: React.FC<{ reportId: number; closefn: () => void }> = ({
  reportId,
  closefn,
}) => {
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      title: "",
      link: "",
      readmore_link: "",
      image: null,
      details: [
        {
          header: "please fill header field",
          value: "please fill value field",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "details",
    control,
    rules: {
      required: "Please add atleast one header value pair",
    },
  });

  const { isLoading, isFetching, isError, data } = useQuery(
    `report-${reportId}`,
    () => reportsRetrieve(reportId),
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (data) {
      const main_data = {
        name: data.name,
        title: data.title,
        link: data.link,
        readmore_link: data?.readmore_link,
        image: data.image,
        details: data.details,
      };
      reset(main_data);
    }
  }, [reset, data]);

  const { mutate, isLoading: editLoading } = useMutation(reportsUpdate, {
    onMutate: () => {
      toast.info("reports edits saving...", {
        progressClassName: "toastProgress",
        icon: false,
      });
    },
    onSuccess: () => {
      toast.success("reports edits saved", {
        progressClassName: "toastProgress",
        icon: false,
      });
      queryClient.invalidateQueries(`report-${reportId}`);
      queryClient.invalidateQueries("all-reports");
      closefn();
    },
    onError: () => {
      toast.error("reports not edited", {
        icon: false,
        progressClassName: "toastProgress",
      });
    },
  });

  const onSubmitHandler = (data: formInputData) => {
    const FormDataHandler = new FormData();
    let { image, details, link, ...payload } = data;
    if (typeof data.image !== "string" && data.image instanceof FileList) {
      image = image[0];
      FormDataHandler.append("image", image);
    }
    if (typeof data.link !== "string" && data.link instanceof FileList) {
      link = link[0];
      FormDataHandler.append("link", link);
    }
    FormDataHandler.append("details", JSON.stringify(details));

    Object.keys(payload)?.forEach((key) =>
      //@ts-ignore
      FormDataHandler.append(key, payload[key])
    );

    mutate({ reportId, FormDataHandler });
  };

  const previousImage = data?.image;
  const previousFileLink = data?.link;
  return (
    <>
      <ModalsContainer>
        {isLoading || isFetching || editLoading ? (
          <Loading light loading={isLoading || isFetching || editLoading} />
        ) : !isError ? (
          <Form onSubmit={handleSubmit(onSubmitHandler)}>
            <h2>Edit a Report</h2>
            <br />
            <FormError>{errors?.name?.message}</FormError>
            <FormInput>
              <label>
                Name
                <br />
                <input type="text" {...register("name", { required: true })} />
              </label>
            </FormInput>
            <FormError>{errors?.image?.message}</FormError>
            <FormInput>
              <SelectImage image={`${previousImage}`} />
              <label>
                Image
                <br />
                <input
                  type="file"
                  accept="image/*"
                  {...register("image", { required: true })}
                />
              </label>
            </FormInput>
            <FormError>{errors?.title?.message}</FormError>
            <FormInput>
              <label>
                Title
                <br />
                <input type="text" {...register("title", { required: true })} />
              </label>
            </FormInput>
            <div>
              <a
                href={previousFileLink}
                target="_blank"
                style={{ color: "#fff" }}
              >
                Current File Link (click to view)
              </a>
            </div>
            <FormError>{errors?.link?.message}</FormError>
            <FormInput>
              <label>
                Upload File
                <br />
                <input
                  type={"file"}
                  accept=".doc,.docx,.odt,.pdf,.xls,.xlsx,.ppt,.pptx,.txt,.ods"
                  style={{ backgroundColor: "#fff" }}
                  {...register("link")}
                />
              </label>
            </FormInput>

            <FormError>{errors?.readmore_link?.message}</FormError>
            <FormInput>
              <label>
                Read More Link
                <br />
                <input
                  type={"url"}
                  style={{ backgroundColor: "#fff" }}
                  {...register("readmore_link")}
                />
              </label>
            </FormInput>

            {fields.map((fields, index) => (
              <section key={fields.id}>
                <FormInput>
                  <label>
                    Header*
                    <br />
                    <input
                      type={"text"}
                      style={{ backgroundColor: "#fff" }}
                      {...register(`details.${index}.header`, {
                        required: true,
                      })}
                    />
                  </label>
                </FormInput>

                <FormInput>
                  <label>
                    Description*
                    <br />
                    <textarea
                      style={{ backgroundColor: "#fff" }}
                      rows={6}
                      cols={50}
                      {...register(`details.${index}.value`, {
                        required: true,
                      })}
                    />
                  </label>
                </FormInput>
                <div>
                  <Button styleType={"whiteBg"} onClick={() => remove(index)}>
                    DELETE
                  </Button>
                  <br />
                </div>
              </section>
            ))}
            <FormError>{errors?.details?.message}</FormError>
            <AddMoreButton
              justify="flex-start"
              click={() =>
                append({
                  header: "please fill header field",
                  value: "please fill vlaue field",
                })
              }
            >
              Add More or Show All
            </AddMoreButton>

            <div>
              <CustomModalButton isDisabled={isLoading}>SAVE</CustomModalButton>
            </div>
          </Form>
        ) : (
          <FormError>Can't Fetch Reports</FormError>
        )}
      </ModalsContainer>
    </>
  );
};

export default EditReportsModal;
