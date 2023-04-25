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
  link: string;
  image: any;
  details: detailsObj[];
};

const schema = yup.object({
  name: yup.string().required(),
  title: yup.string().required(),
  link: yup.string().url().required(),
  image: yup.mixed().required(),
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
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      title: "",
      link: "",
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
    let { image, details, ...payload } = data;
    if (typeof data.image !== "string" && data.image instanceof FileList) {
      image = image[0];
      FormDataHandler.append("image", image);
    }
    FormDataHandler.append("details", JSON.stringify(details));

    Object.keys(payload)?.forEach((key) =>
      //@ts-ignore
      FormDataHandler.append(key, payload[key])
    );

    mutate({ reportId, FormDataHandler });
  };

  const previousImage = getValues("image");
  return (
    <>
      <ModalsContainer>
        {isLoading || isFetching || editLoading ? (
          <Loading loading={isLoading || isFetching || editLoading} />
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
            <FormError>{errors?.link?.message}</FormError>
            <FormInput>
              <label>
                Read More Link*
                <br />
                <input type="text" {...register("link", { required: true })} />
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
                    Paragraph*
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
              <CustomModalButton isDisabled={isLoading}>EDIT</CustomModalButton>
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
