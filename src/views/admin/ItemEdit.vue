<template>
  <div class="admin-item-edit">
    <div class="container-fluid px-1 px-md-4">
      <!-- Loading Spinner -->
      <div v-if="isLoading" class="text-center py-5">
        <div class="spinner-border text-white" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 text-white">Loading item data...</p>
      </div>

      <form v-else @submit.prevent="submitForm">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h5 class="font-weight-bolder mb-0">Edit Item Information</h5>
                  <!-- <span class="badge bg-info">Item ID: {{ itemId }}</span> -->
                </div>

                <div class="row mt-3">
                  <div class="col-12 col-md-4">
                    <label>Item Name <span class="text-danger">*</span></label>
                    <input v-model="formData.itemName" class="form-control" type="text" placeholder="Item Name"
                      required />
                  </div>

                  <div class="col-12 col-md-4">
                    <label>Item Alias Code <span class="text-danger">*</span></label>
                    <input v-model="formData.itemAlias" class="form-control" type="text" placeholder="Item Alias Code"
                      required />
                  </div>

                  <div class="col-12 col-md-4">
                    <label class="mt-2">Category <span class="text-danger">*</span></label>
                    <multiselect v-model="formData.category" :options="categories" placeholder="Select Category"
                      label="category_name" track-by="category_id" :loading="loadingCategories" />
                  </div>

                  <div class="col-12 col-md-4">
                    <label class="mt-2">Brand <span class="text-danger">*</span></label>
                    <multiselect v-model="formData.brand" :options="brands" placeholder="Select Brand"
                      label="brand_name" track-by="item_brand_id" :loading="loadingBrands" />
                  </div>

                  <div class="col-12 col-md-4">
                    <label class="mt-2">Dealer Name <span class="text-danger">*</span></label>
                    <input v-model="formData.dealerName" class="form-control" type="text" placeholder="Dealer Name"
                      required />
                  </div>

                  <div class="col-12 col-md-4">
                    <label class="mt-2">Price (₹) <span class="text-danger">*</span></label>
                    <input v-model.number="formData.price" class="form-control" type="number" step="0.01"
                      placeholder="Price" required />
                  </div>

                  <div class="col-12 col-md-4">
                    <label class="mt-2">Discount (%)</label>
                    <input v-model.number="formData.discountPercentage" class="form-control" type="number" step="0.01"
                      placeholder="Discount Percentage (0-100)" min="0" max="100" />
                  </div>

                  <div class="col-12 col-md-4">
                    <label class="mt-2">Selling Price (GST Excluded)</label>
                    <input v-model="sellingPriceWithoutGST" class="form-control" type="number" step="0.01" disabled />
                  </div>

                  <div class="col-12 col-md-4">
                    <label class="mt-2">GST Type <span class="text-danger">*</span></label>
                    <multiselect v-model="formData.gstType" :options="gstOptions" placeholder="Select GST Type"
                      label="tax_type" track-by="tax_type_id" :loading="loadingTaxTypes" />
                  </div>

                  <div class="col-12 col-md-4">
                    <label class="mt-2">Price (GST Included)</label>
                    <input v-model="sellingPriceWithGST" class="form-control" type="number" step="0.01" disabled />
                  </div>

                  <div class="col-12 col-md-4">
                    <label>Item Link</label>
                    <input v-model="formData.itemLink" class="form-control" type="url"
                      placeholder="https://example.com/item" />
                  </div>

                  <div class="col-12 col-md-4 d-flex align-items-center">
                    <label class="me-3 mb-0">Stock Status:</label>
                    <div class="form-check form-switch">
                      <input class="form-check-input" type="checkbox" id="stockStatusSwitch"
                        v-model="formData.haveStock" />
                      <label class="form-check-label" for="stockStatusSwitch">
                        {{ formData.haveStock ? 'Available' : 'Out of Stock' }}
                      </label>
                    </div>
                  </div>
                </div>

                <div class="mt-3">
                  <label class="mt-2 d-flex align-items-center justify-content-between">
                    <span>Item Specification</span>
                    <button v-if="formData.specifications.length < 10" class="btn btn-sm mb-0 px-3 p-1 ms-2 btn-primary"
                      type="button" @click="addSpecification">
                      Add New Spec
                    </button>
                  </label>
                  <div class="card">
                    <div class="table-responsive">
                      <table class="table align-items-center mb-0">
                        <thead>
                          <tr>
                            <th>Sl No</th>
                            <th class="text-center">Specification Head</th>
                            <th class="text-center">Description</th>
                            <th class="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(spec, index) in formData.specifications" :key="`spec-${spec.item_specification_id || index}`">
                            <td class="align-middle text-center">{{ index + 1 }}</td>
                            <td class="align-middle text-center">
                              <input v-model="spec.spec_heading" class="form-control" type="text"
                                placeholder="Specification" required />
                            </td>
                            <td class="align-middle text-center">
                              <input v-model="spec.description" class="form-control" type="text"
                                placeholder="Description" required />
                            </td>
                            <td class="align-middle text-center">
                              <button type="button" class="btn btn-danger btn-sm px-2 py-1 mb-0"
                                @click="removeSpecification(index)">
                                Remove
                              </button>
                            </td>
                          </tr>
                          <tr v-if="formData.specifications.length === 0">
                            <td colspan="4" class="text-center text-muted py-3">
                              No specifications added yet.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-12">
                    <label class="mt-2">Description <span class="text-danger">*</span></label>
                    <textarea v-model="formData.description" class="form-control" placeholder="Item Description"
                      rows="3" required></textarea>
                  </div>
                  <div class="col-12">
                    <label class="mt-2">Additional Information</label>
                    <textarea v-model="formData.additionalInfo" class="form-control"
                      placeholder="Additional Information" rows="3"></textarea>
                  </div>
                </div>

                <div class="row mt-1">
                  <div class="col-12 col-md-3 mt-4">
                    <label>Main Image <span class="text-danger">*</span> (Image size - 679x679)</label>
                    <div class="proof">
                      <div :class="['imgArea', { active: mainImagePreview }]" :data-title="mainImageFileName"
                        @click="triggerMainImageUpload">
                        <input type="file" ref="mainImageInput" @change="handleMainImageUpload" hidden
                          accept="image/*" />
                        <template v-if="!mainImagePreview">
                          <i class="fa-solid fa-cloud-arrow-up"></i>
                          <h5>Upload image</h5>
                          <p>image will be resized to <span>679x679</span></p>
                        </template>
                        <img v-if="mainImagePreview" :src="mainImagePreview" alt="Main Image Preview"
                          class="uploaded-image" />
                      </div>
                      <small class="text-muted d-block mt-2" v-if="!formData.mainImage && existingMainImage">
                        <i class="fa fa-check-circle text-success"></i> Current image loaded
                      </small>
                      <small class="text-success d-block mt-2" v-if="formData.mainImage">
                        <i class="fa fa-info-circle"></i> New image will be uploaded
                      </small>
                    </div>
                  </div>

                  <div class="col-12 col-md-9 mt-4">
                    <div class="d-flex justify-content-between align-items-center">
                      <h5 class="font-weight-bolder mb-0">Sub Images (Optional) (Image size - 679x679)</h5>
                      <button type="button" class="btn btn-primary btn-sm" @click="addSubImage">
                        + Add Sub Image
                      </button>
                    </div>
                    <div class="card card-body py-2">

                      <div class="row" v-if="formData.subImages.length > 0">
                        <div v-for="(subImage, index) in formData.subImages" :key="`subImage-${subImage.item_image_id || index}`"
                          class="col-md-4 mt-2">
                          <div class="sub-image-container">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                              <label class="mb-0">
                                Sub Image {{ index + 1 }} 
                              </label>
                              <button type="button" class="btn btn-danger btn-sm px-2 py-1"
                                @click="removeSubImage(index)">
                                Remove
                              </button>
                            </div>
                            <input class="form-control" type="file" @change="handleSubImageUpload(index, $event)"
                              accept="image/*" />
                            <div v-if="subImage.preview" class="mt-2">
                              <img :src="subImage.preview" alt="Sub Image Preview" class="sub-image-preview" />
                              <small class="text-success d-block mt-1">
                                <i class="fa fa-info-circle"></i> New image
                              </small>
                            </div>
                            <div v-else-if="subImage.image_url" class="mt-2">
                              <img :src="subImage.image_url" alt="Existing Sub Image" class="sub-image-preview" />
                              <small class="text-muted d-block mt-1">
                                <i class="fa fa-check-circle text-success"></i> Existing image
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div v-else class="text-center py-4 text-muted">
                        <p>No sub images added yet. Click "Add Sub Image" to add images.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-lg-4">
            <button type="button" class="btn btn-lg btn-outline-secondary w-100" @click="cancelEdit">
              Cancel
            </button>
          </div>
          <div class="col-lg-4 ms-auto">
            <button type="submit" class="btn btn-lg bg-gradient-dark w-100" :disabled="isSubmitting">
              {{ isSubmitting ? "Updating..." : "Update Item" }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Multiselect from "vue-multiselect";
import { api } from "@/services/api";

export default {
  name: "AdminItemEdit",
  components: { Multiselect },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const itemId = ref(route.params.id || null);
    const mainImageInput = ref(null);
    const mainImagePreview = ref("");
    const mainImageFileName = ref("");
    const existingMainImage = ref("");
    const isSubmitting = ref(false);
    const isLoading = ref(true);

    // Loading states
    const loadingCategories = ref(false);
    const loadingBrands = ref(false);
    const loadingTaxTypes = ref(false);

    const categories = ref([]);
    const brands = ref([]);
    const gstOptions = ref([]);

    const formData = reactive({
      itemName: "",
      itemAlias: "",
      brand: null,
      category: null,
      dealerName: "",
      gstType: null,
      price: 0,
      discountPercentage: 0,
      description: "",
      additionalInfo: "",
      itemLink: "",
      mainImage: null,
      subImages: [],
      haveStock: true,
      specifications: [],
    });

    const sellingPriceWithoutGST = computed(() => {
      const price = parseFloat(formData.price) || 0;
      let discount = parseFloat(formData.discountPercentage) || 0;

      if (discount < 0) discount = 0;
      if (discount > 100) discount = 100;

      const discountFactor = 1 - (discount / 100);
      return (price * discountFactor).toFixed(2);
    });

    const sellingPriceWithGST = computed(() => {
      const priceAfterDiscount = parseFloat(sellingPriceWithoutGST.value) || 0;

      if (priceAfterDiscount === 0 || !formData.gstType) return "0.00";

      const gstPercentage = parseFloat(formData.gstType.tax || 0);
      const gstAmount = (priceAfterDiscount * gstPercentage) / 100;
      return (priceAfterDiscount + gstAmount).toFixed(2);
    });

    // --- Data Fetching ---
    const fetchCategories = async () => {
      loadingCategories.value = true;
      try {
        const response = await api.get("/v1/admin/category/active");
        if (response.data.success) {
          categories.value = response.data.data;
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        alert("Failed to load categories");
      } finally {
        loadingCategories.value = false;
      }
    };

    const fetchBrands = async () => {
      loadingBrands.value = true;
      try {
        const response = await api.get("/v1/admin/item-brand/active");
        if (response.data.success) {
          brands.value = response.data.data;
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
        alert("Failed to load brands");
      } finally {
        loadingBrands.value = false;
      }
    };

    const fetchTaxTypes = async () => {
      loadingTaxTypes.value = true;
      try {
        const response = await api.get("/v1/admin/tax-type/active");
        if (response.data.success) {
          gstOptions.value = response.data.data;
        }
      } catch (error) {
        console.error("Error fetching tax types:", error);
        alert("Failed to load tax types");
      } finally {
        loadingTaxTypes.value = false;
      }
    };

    const fetchItemData = async () => {
      if (!itemId.value) {
        alert("No item ID provided");
        router.push("/admin/item-list");
        return;
      }

      isLoading.value = true;
      try {
        // Fetch all dropdown data first
        await Promise.all([
          fetchCategories(),
          fetchBrands(),
          fetchTaxTypes()
        ]);

        // Now fetch item data
        const response = await api.get(`/v1/admin/item/view/${itemId.value}`);
        
        if (response.data.success) {
          const item = response.data.data;
          
          // Populate form data
          formData.itemName = item.item_name || "";
          formData.itemAlias = item.item_alias_code || "";
          formData.dealerName = item.dealer_name || "";
          formData.price = parseFloat(item.price) || 0;
          formData.discountPercentage = parseFloat(item.discount) || 0;
          formData.description = item.description || "";
          formData.additionalInfo = item.additional_information || "";
          formData.itemLink = item.item_link || "";
          formData.haveStock = item.have_stock === 1;

          // Set main image preview
          if (item.item_image_url) {
            mainImagePreview.value = item.item_image_url;
            existingMainImage.value = item.item_image_path || item.item_image_url;
          }

          // Load specifications
          if (item.specifications && item.specifications.length > 0) {
            formData.specifications = item.specifications.map(spec => ({
              item_specification_id: spec.item_specification_id,
              spec_heading: spec.spec_heading || "",
              description: spec.description || ""
            }));
          }

          // Load gallery/sub images
          if (item.gallery_images && item.gallery_images.length > 0) {
            formData.subImages = item.gallery_images.map(img => ({
              item_image_id: img.item_image_id,
              file: null,
              preview: null,
              image_url: img.image_url,
              image_path: img.image_path
            }));
          }

          // Set selected category
          formData.category = categories.value.find(c => c.category_id === item.category_id) || null;
          
          // Set selected brand
          formData.brand = brands.value.find(b => b.item_brand_id === item.item_brand_id) || null;
          
          // Set selected GST type
          formData.gstType = gstOptions.value.find(g => g.tax_type_id === item.tax_type_id) || null;

        } else {
          alert("Failed to load item data");
          router.push("/admin/item-list");
        }
      } catch (error) {
        console.error("Error fetching item data:", error);
        alert("Error loading item data: " + (error.response?.data?.message || error.message));
        router.push("/admin/item-list");
      } finally {
        isLoading.value = false;
      }
    };

    // --- Image Uploads and Resizing ---
    const fileTypes = [
      "image/apng", "image/bmp", "image/gif", "image/jpeg", "image/png", "image/webp", "image/avif",
    ];
    const validFileType = (file) => fileTypes.includes(file.type);
    const showAlert = (msg) => alert(msg);
    const triggerMainImageUpload = () => mainImageInput.value?.click();

    const resizeImage = (file, targetWidth, targetHeight, quality = 0.9) => {
      return new Promise((resolve, reject) => {
        if (!file || !file.type.startsWith('image/')) {
          reject(new Error('File is not an image.'));
          return;
        }

        const reader = new FileReader();
        reader.onload = (readerEvent) => {
          const image = new Image();
          image.onload = () => {
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');

            canvas.width = targetWidth;
            canvas.height = targetHeight;

            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            let imageRatio = image.width / image.height;
            let targetRatio = targetWidth / targetHeight;

            let drawWidth;
            let drawHeight;
            let xOffset = 0;
            let yOffset = 0;

            if (imageRatio > targetRatio) {
              drawWidth = targetWidth;
              drawHeight = targetWidth / imageRatio;
              yOffset = (targetHeight - drawHeight) / 2;
            } else {
              drawHeight = targetHeight;
              drawWidth = targetHeight * imageRatio;
              xOffset = (targetWidth - drawWidth) / 2;
            }

            ctx.drawImage(image, xOffset, yOffset, drawWidth, drawHeight);

            canvas.toBlob((blob) => {
              if (blob) {
                const resizedFile = new File([blob], file.name, {
                  type: 'image/jpeg',
                  lastModified: Date.now()
                });
                resolve({ file: resizedFile, preview: canvas.toDataURL('image/jpeg', quality) });
              } else {
                reject(new Error('Canvas to Blob conversion failed.'));
              }
            }, 'image/jpeg', quality);
          };
          image.onerror = reject;
          image.src = readerEvent.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };

    const handleMainImageUpload = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (!validFileType(file)) {
        showAlert("Invalid file type. Please upload an image (JPG, PNG, GIF, etc.).");
        return;
      }

      try {
        const resized = await resizeImage(file, 679, 679, 1);
        mainImagePreview.value = resized.preview;
        mainImageFileName.value = file.name;
        formData.mainImage = resized.file;
      } catch (error) {
        console.error("Error processing main image:", error);
        showAlert("Failed to process main image. " + error.message);
        mainImagePreview.value = "";
        mainImageFileName.value = "";
        formData.mainImage = null;
      }
    };

    const addSubImage = () => formData.subImages.push({ file: null, preview: null, image_url: null });
    
    const removeSubImage = (i) => {
      if (formData.subImages[i].item_image_id) {
        if (confirm("Are you sure you want to remove this existing image?")) {
          formData.subImages.splice(i, 1);
        }
      } else {
        formData.subImages.splice(i, 1);
      }
    };

    const handleSubImageUpload = async (i, e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (!validFileType(file)) {
        showAlert("Invalid file type for sub-image. Please upload an image.");
        return;
      }

      try {
        const resized = await resizeImage(file, 679, 679, 0.7);
        formData.subImages[i].file = resized.file;
        formData.subImages[i].preview = resized.preview;
      } catch (error) {
        console.error(`Error processing sub image ${i}:`, error);
        showAlert(`Failed to process sub image ${i}. ` + error.message);
        formData.subImages[i].file = null;
        formData.subImages[i].preview = null;
      }
    };

    // --- Specification Management ---
    const addSpecification = () => {
      if (formData.specifications.length < 10) {
        formData.specifications.push({ spec_heading: "", description: "" });
      }
    };
    
    const removeSpecification = (i) => {
      if (formData.specifications[i].item_specification_id) {
        if (confirm("Are you sure you want to remove this specification?")) {
          formData.specifications.splice(i, 1);
        }
      } else {
        formData.specifications.splice(i, 1);
      }
    };

    // --- Form Submission ---
    const submitForm = async () => {
      if (!formData.itemName || !formData.itemAlias || !formData.category || !formData.brand || !formData.gstType) {
        alert("Please fill in all required fields.");
        return;
      }

      isSubmitting.value = true;

      try {
        const formDataToSend = new FormData();

        formDataToSend.append('_method', 'post');
        formDataToSend.append('item_name', formData.itemName);
        formDataToSend.append('item_alias_code', formData.itemAlias);
        formDataToSend.append('category_id', formData.category.category_id);
        formDataToSend.append('item_brand_id', formData.brand.item_brand_id);
        formDataToSend.append('dealer_name', formData.dealerName);
        formDataToSend.append('tax_type_id', formData.gstType.tax_type_id);
        formDataToSend.append('price', parseFloat(formData.price));
        formDataToSend.append('discount', parseFloat(formData.discountPercentage || 0));
        formDataToSend.append('tax_excluded_price', parseFloat(sellingPriceWithoutGST.value));
        formDataToSend.append('tax_included_price', parseFloat(sellingPriceWithGST.value));
        formDataToSend.append('item_link', formData.itemLink);
        formDataToSend.append('have_stock', formData.haveStock ? 1 : 0);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('additional_information', formData.additionalInfo || "");

        // Append main image only if a new one was uploaded
        if (formData.mainImage) {
          formDataToSend.append('item_image', formData.mainImage, formData.mainImage.name);
        }

        // Append sub images
        formData.subImages.forEach((subImage, index) => {
          if (subImage.file) {
            // New image uploaded
            formDataToSend.append(`images[${index}][image]`, subImage.file, subImage.file.name);
          }
          if (subImage.item_image_id) {
            // Existing image ID
            formDataToSend.append(`images[${index}][item_image_id]`, subImage.item_image_id);
          }
        });

        // Append specifications
        formData.specifications
          .filter(spec => spec.spec_heading && spec.description)
          .forEach((spec, index) => {
            formDataToSend.append(`specifications[${index}][spec_heading]`, spec.spec_heading);
            formDataToSend.append(`specifications[${index}][description]`, spec.description);
            if (spec.item_specification_id) {
              formDataToSend.append(`specifications[${index}][id]`, spec.item_specification_id);
            }
          });

        const response = await api.post(`/v1/admin/item/update/${itemId.value}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.data.success) {
          alert("Item updated successfully!");
          router.push("/admin/item-list");
        } else {
          alert(response.data.message || "Failed to update item");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        const errorMessage = error.response?.data?.message || "Error updating item. Please try again.";
        alert(errorMessage);
      } finally {
        isSubmitting.value = false;
      }
    };

    const cancelEdit = () => {
      if (confirm("Are you sure you want to cancel? All unsaved changes will be lost.")) {
        router.push("/admin/item-list");
      }
    };

    onMounted(() => {
      fetchItemData();
    });

    return {
      itemId,
      mainImageInput,
      mainImagePreview,
      mainImageFileName,
      existingMainImage,
      isSubmitting,
      isLoading,
      formData,
      categories,
      brands,
      gstOptions,
      loadingCategories,
      loadingBrands,
      loadingTaxTypes,
      sellingPriceWithGST,
      sellingPriceWithoutGST,
      triggerMainImageUpload,
      handleMainImageUpload,
      addSubImage,
      removeSubImage,
      handleSubImageUpload,
      addSpecification,
      removeSpecification,
      submitForm,
      cancelEdit,
    };
  },
};
</script>

<style scoped>
.imgArea {
  border: 2px dashed #ddd;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  overflow: hidden;
}

.imgArea:hover {
  border-color: #007bff;
  background-color: #f8f9ff;
}

.imgArea.active {
  border-color: #28a745;
  background-color: #f8fff8;
}

.imgArea i {
  font-size: 3rem;
  color: #6c757d;
  margin-bottom: 1rem;
}

.uploaded-image {
  max-width: 100%;
  max-height: 200px;
  border-radius: 8px;
  object-fit: contain;
  width: 100%;
  height: 100%;
}

.sub-image-container {
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 15px;
  background-color: #f8f9fa;
}

.sub-image-preview {
  width: 100%;
  max-height: 120px;
  border-radius: 6px;
  object-fit: contain;
}

.card {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  border: 1px solid #e9ecef;
}

.card-body {
  padding: 1.5rem;
}

.btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

label {
  font-weight: 600;
  color: #495057;
  margin-bottom: 0.5rem;
}

.text-muted {
  color: #6c757d !important;
}

.text-danger {
  color: #dc3545 !important;
}

.badge {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}
</style>