<template>
    <section>
        <el-row>
            <el-col :span="24">
                <el-card>
                    <el-tabs type="card" @tab-click="handleClick">
                        <el-tab-pane label="Event Information">
                        <el-row :gutter="20">
                        <el-col :sm="24" :xs="24" :md="24" :lg="12">
                            <el-form labelPosition="left" ref="eventInformation" :rules="eventFormRules"
                                     :model="eventForm" label-width="120px">
                                <el-form-item label="Name" prop="name">
                                    <el-input v-model="eventForm.name"></el-input>
                                </el-form-item>

                                <el-row>
                                    <el-col :xs="24" :sm="24" :md="24" :lg="24">
                                    <el-form-item label="Date" prop="date">
                                        <el-date-picker
                                                v-model="eventForm.date"
                                                type="daterange"
                                                placeholder="Pick dates">
                                        </el-date-picker>
                                    </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-form-item label="Location" prop="location">
                                    <el-input v-model="eventForm.location" clearable
                                               placeholder="Location">
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="Status" prop="status">
                                    <el-radio-group v-model="eventForm.status">
                                        <el-radio :label="1">Active</el-radio>
                                        <el-radio :label="0">Inactive</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="Description" prop="description">
                                    <vue-editor v-model="eventForm.description"></vue-editor>
                                </el-form-item>
                                <el-form-item>

                                    <el-button type="primary" @click="saveEventInformation"
                                               :loading="savingEventInformation">Save
                                    </el-button>
                                </el-form-item>
                            </el-form>
                            </el-col>
                                <el-col :sm="24" :xs="24" :md="24" :lg="12">
                                    <h3 style="padding-left: 78px;">Image</h3>
                                    <el-upload
                                            class="picture-card"
                                             list-type="picture-card"
                                            v-bind:action="uploadUrl"
                                            :show-file-list="false"
                                            :on-success="onEventImageUpload"
                                            :before-upload="uploadEventImage" style="padding-left: 78px; width: 80px; height:100px;">
                                        <img v-if="eventForm.image_url" id="event_image" :src="eventForm.image_url" class="avatar">
                                        <i v-else class="el-icon-plus
                                         avatar-uploader-icon"></i>
                                    </el-upload>

                                      <!--<h3>Other Images</h3>-->

                                    <!--<el-upload-->
                                            <!--:action="uploadUrl"-->
                                            <!--list-type="picture-card"-->
                                            <!--:fileList="eventImages"-->
                                            <!--:on-preview="handlePictureCardPreview"-->
                                            <!--:on-remove="handleRemove">-->
                                        <!--<i class="el-icon-plus"></i>-->
                                    <!--</el-upload>-->
                                    <el-dialog v-model="EventImageDialogVisible" size="tiny">
                                        <img width="100%" :src="dialogImageUrl" alt="">
                                    </el-dialog>
                                </el-col>
                            </el-row>
                        </el-tab-pane>

                        <el-tab-pane label="Event Tickets" v-if="eventForm.id!==-1">
                            <el-row :gutter="20">
                                <el-col :xs="24" :sm="24" :md="24" :lg="12">
                                    <el-form ref="eventTicketForm" :model="eventTicketForm" label-width="120px"
                                             labelPosition="left">
                                        <el-form-item label="Option">
                                            <el-select v-model="eventTicketForm.ticket_option_id"
                                                       placeholder="please select your option">
                                                <el-option label="VVip" value="1"></el-option>
                                                <el-option label="Vip" value="2"></el-option>
                                                <el-option label="Reg" value="3"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="Seasonal" prop="seasonal">
                                        <el-radio-group v-model="eventTicketForm.seasonal">
                                            <el-radio value="0" label="0">One Day</el-radio>
                                            <el-radio value="1" label="1">Season</el-radio>
                                        </el-radio-group>
                                        </el-form-item>
                                        <el-form-item label="Tickets">
                                            <el-input-number v-model="eventTicketForm.total_tickets" placeholder="tickets"></el-input-number>
                                        </el-form-item>
                                        <el-form-item label="Price">
                                            <el-input v-model="eventTicketForm.amount"
                                            placeholder="in Ksh."></el-input>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button type="primary" @click="saveEventTicketForm" :loading="savingEventTicketForm">Add</el-button>
                                        </el-form-item>
                                    </el-form>
                                </el-col>
                                <el-col :xs="24" :sm="24" :md="24" :lg="12">
                                    <el-table height="250"
                                              :data="eventTickets"
                                              border
                                              style="width: 100%">
                                        <el-table-column :formatter="formatOption" prop="ticket_option_id" label="Option" width="180">

                                        </el-table-column>
                                        <el-table-column :formatter="formatSeason" prop="seasonal" label="Seasonal" width="180">

                                        </el-table-column>
                                        <el-table-column prop="total_tickets" label="Tickets" width="200">
                                        </el-table-column>
                                        <el-table-column prop="amount" label="Price" width="180">

                                        </el-table-column>
                                    </el-table>
                                </el-col>
                            </el-row>
                        </el-tab-pane>

                        <el-tab-pane label="Merchandise" v-if="eventForm.id!==-1">
                            <el-row :gutter="20">
                                <el-col :xs="24" :sm="24" :md="24" :lg="12">


                                    <el-form ref="merchandiseForm" :model="merchandiseForm" label-width="120px"
                                             labelPosition="left">
                                        <el-form-item label="Name">
                                            <el-input v-model="merchandiseForm.name"></el-input>
                                        </el-form-item>

                                        <el-form-item label="price">
                                            <el-input v-model="merchandiseForm.amount" placeholder="Price"></el-input>
                                        </el-form-item>
                                        <el-form-item label="Quantity">
                                            <el-input-number v-model="merchandiseForm.quantity" placeholder="quantity"></el-input-number>
                                        </el-form-item>
                                        <el-form-item label="Description">
                                            <el-input type="textarea" v-model="merchandiseForm.description"></el-input>
                                        </el-form-item>

                                        <el-form-item label="Image">
                                        <el-upload
                                                :action="uploadUrl"
                                                list-type="picture-card"
                                                :before-upload="uploadMerchandiseImage"
                                                :on-preview="handlePictureCardPreview"
                                                :on-remove="handleRemove">
                                            <img id="merchandise_image" v-if="merchandiseForm.image_url" :src="merchandiseForm.image_url" class="avatar">

                                            <i class="el-icon-plus"></i>
                                        </el-upload>
                                        </el-form-item>
                                        <br>
                                        <br>
                                        <el-form-item>
                                            <el-button type="primary" @click="saveMerchandiseForm" :loading="savingMerchandiseForm">Add</el-button>
                                        </el-form-item>
                                    </el-form>
                                </el-col>

                                <el-col :xs="24" :sm="24" :md="24" :lg="12">
                                    <el-table height="250"
                                              :data="merchandises"
                                              border
                                              style="width: 100%">
                                        <el-table-column prop="image_url" label="Image" width="180">
                                        </el-table-column>

                                        <el-table-column prop="name" label="Name" width="180">
                                        </el-table-column>
                                        <el-table-column prop="description" label="Description" width="200">
                                        </el-table-column>
                                        <el-table-column prop="amount" label="Price" width="180">
                                        </el-table-column>

                                        <el-table-column prop="quantity" label="Quantity" width="200">
                                        </el-table-column>
                                    </el-table>
                                </el-col>
                            </el-row>
                        </el-tab-pane>

                    </el-tabs>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">Create</el-button>
                        <el-button>Cancel</el-button>
                    </el-form-item>
                </el-card>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import ElRow from "element-ui/packages/row/src/row";
    import ElCol from "element-ui/packages/col/src/col";
    import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item";
    import {VueEditor} from 'vue2-editor'
    import {
        addEvent,
        editEvent,
        getEventTicket,
        getEvent,
        uploadFile,

        getEventTickets,
        addEventTickets, editEventTicket, addMerchandise, editMerchandise
    } from "../../api/api";
    import ElButton from "../../../node_modules/element-ui/packages/button/src/button";
    import config from '../../config'
    import {apiBaseUrl} from "../../config/index";
    export default{
        components: {
            ElButton,
            ElFormItem,
            ElCol,
            ElRow,
            VueEditor
        },
        data() {
            return {
                savingEventInformation: false,
                updatingEventInformation: false,
                savingEventTicketForm: false,
                savingMerchandiseForm: false,
                updatingMerchandiseForm: false,
                EventImageDialogVisible: false,
                dialogImageUrl: '',
                imageUrl: '',
                formEventProcessing: false,
                formTicketOptionProcessing: false,
                eventTickets: [],
                merchandises: [],
                eventForm: {
                    id: -1,
                    name: '',
                    status: 0,
                    image_url: '',
                    description: '',
                    date: ''
                },
                eventTicketForm: {
                    id: -1,
                    name: '',
                    total_tickets: 0,
                    status: 0,
                    seasonal: 0,
                    amount: 0.00,
                    event_id: 0,
                    ticket_option_id: 1
                },
                merchandiseForm: {
                    id: -1,
                    event_id: -1,
                    name: '',
                    amount: 0,
                    quantity: 0,
                    description: '',
                    image_url: '',
                    image: null
                },

                eventOptions: [],
                uploadUrl: apiBaseUrl + 'Events/image/upload',
                eventImages: [{
                    name: 'food.jpeg',
                    url: 'http://localhost/mine/image00.png'
                },
                    {
                        name: 'food2.jpeg',
                        url: 'http://localhost/mine/image00.png'
                    }],
                eventFormRules: {
                    name: [
                        {required: true, message: 'Required', trigger: 'blur'}
                    ]
                },
            }
        },
        methods: {
/******change the format form one data type to another*****/
            formatSeason (row, column) {
                if(row.seasonal === 1){
                    return "Seasonal";
                }
                return "One day";
            },
            formatOption (row, column) {
                if(row.ticket_option_id === 3){
                    return "VVip";
                }
                else if(row.ticket_option_id === 2){
                    return "Vip";
                }
                else{
                    return "Regular";
                }

            },
            onSubmit() {
                console.log('submit!');
            },
            handleClick(){

            },
            uploadMerchandiseImage (file){
                var _URL = window.URL || window.webkitURL;
                var img = new Image();
                img.onload = function () {
                    alert(this.width + " " + this.height);
                };
                img.src = _URL.createObjectURL(file);
                this.merchandiseForm.image = file;
                this.merchandiseForm.image_url = -1;
                var reader  = new FileReader();
                // it's onload event and you forgot (parameters)
                reader.onload = function(e)  {
                    var image = document.getElementById("merchandise_image");
                    // the result image data
                    image.src = e.target.result;
                    // document.body.appendChild(image);
                }
                // you have to declare the file loading
                reader.readAsDataURL(file);
                return false
            },
            updateEventInformation (){
                this.$refs.eventInformation.validate((valid) => {
                    if (valid) {
                        this.$confirm('Update Event？', 'Save', {}).then(() => {
                            this.updatingEventInformation = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.eventForm);
                            editEvent(para).then((res) => {
                                this.updatingEventInformation = false;
                                //NProgress.done();
                                this.$message({
                                    message: 'Updated. ',
                                    type: 'success'
                                });
                            });
                        });
                    }
                });
            },
            saveEventInformation() {
                if (this.eventForm.id !== -1) {
                    this.updateEventInformation();
                    return;
                }
                this.$refs.eventInformation.validate((valid) => {
                    if (valid) {
                        this.$confirm('Add Event？', 'Save', {}).then(() => {
                            this.savingEventInformation = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.eventForm);
                            addEvent(para).then((res) => {
                                this.savingEventInformation = false;
                                //NProgress.done();
                                this.$message({
                                    message: 'Saved. ',
                                    type: 'success'
                                });
                                //Redirect user to the edit page
                                this.$router.push(`/events/edit/${res.data.data.id}`);
                            });
                        });
                    }
                });
            },
/********************************EventTicket***************************************/

            updateEventTicketForm (){
                this.$refs.eventTicketForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('Update Event？', 'Save', {}).then(() => {
                            this.updatingEventTicketForm = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.eventTicketForm);
                            editEventTicket(para).then((res) => {
                                this.updatingEventTicketForm = false;
                                //NProgress.done();
                                this.$message({
                                    message: 'Updated. ',
                                    type: 'success'
                                });
                            });
                        });
                    }
                });
            },
            saveEventTicketForm() {
                this.eventTicketForm.event_id =  this.eventForm.id

                if (this.eventTicketForm.id !== -1) {
                    this.updateEventTicketForm();
                    return;
                }
                this.$refs.eventTicketForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('Add Event Ticket？', 'Save', {}).then(() => {
                            this.savingEventTicketForm = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.eventTicketForm);
                            addEventTickets(para).then((res) => {
                                console.log(res);
                                this.savingEventTicketForm = false;
                                //NProgress.done();
                                this.$message({
                                    message: 'Saved. ',
                                    type: 'success'
                                });
                                //TODO: redirect
                                //this.$router.push(`/events/edit/${res.data.data.id}`);
                            });
                        });
                    }
                });
            },
/******************************Merchandise*********************************/

            updateMerchandise (){
                this.$refs.merchandiseForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('Update Merchandise？', 'Save', {}).then(() => {
                            this.updatingMerchandiseForm = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.merchandiseForm);
                            editMerchandise(para).then((res) => {
                                this.updatingMerchandiseForm = false;
                                //NProgress.done();
                                this.$message({
                                    message: 'Updated. ',
                                    type: 'success'
        });
    });
    });
    }
    });
    },
    saveMerchandiseForm() {
        this.merchandiseForm.event_id =  this.eventForm.id;

        if (this.merchandiseForm.id !== -1) {
            this.updateMerchandiseForm();
            return;
        }
        if(this.merchandiseForm.image ===null){
            this.$message({
                message: 'Please select an image. ',
                type: 'error'
            });
            return;
        }
        this.$refs.merchandiseForm.validate((valid) => {
            if (valid) {
                this.$confirm('Add Merchandise？', 'Save', {}).then(() => {
                    this.savingMerchandiseForm = true;
                    //NProgress.start();
                    let para = Object.assign({}, this.merchandiseForm);
                    addMerchandise(para).then((res) => {
                        console.log(res);
                        this.savingMerchandiseForm = false;
                        //NProgress.done();
                        this.$message({
                            message: 'Saved. ',
                            type: 'success'
                        });
                    });
                });
            }
        });
    },
    /*****************************************************************/
    savingEventTicketForm(){

    },
    updatingEventTicketForm(){

    },
    savingEventOption() {

    },
    updatingEventOption() {

    },
    savingMerchandiseForm() {

    },
    updatingMerchandiseForm() {

    },

    handlePictureCardPreview () {

    },
    onEventImageUpload () {

    },
    uploadEventImage(file) {
            var self =this;
            var _URL = window.URL || window.webkitURL;
            var img = new Image();
            img.onload = function () {
                // alert(this.width + " " + this.height);
                if(this.width === 600 && this.height ===900){
                    //Valid size
                    self.eventForm.image = file;
                    self.eventForm.image_url = -1;
                    var reader  = new FileReader();
                    // it's onload event and you forgot (parameters)
                    reader.onload = function(e)  {
                        var image = document.getElementById("event_image");
                        // the result image data
                        image.src = e.target.result;
                        // document.body.appendChild(image);
                    }
                    // you have to declare the file loading
                    reader.readAsDataURL(file);

                    var data= new FormData();
                    data.append('image',file);
                    uploadFile({data: data,url: self.getEventImageUploadUrl(),method:'post'} ).then((res) => {
                        self.eventForm.image_url = res.data.data
                    });
                }else{
                    var image = document.getElementById("event_image");
                    // the result image data
//                    image.src = null;
                    //not valid
                    alert('File size not supported');
                }
                // alert(this.width + " " + this.height);
           /*         if (this.eventForm.image) {
                        alert(this.width + " " + this.height);
                    } else {
                        console.log('File size not supported')
                    }*/
            };
            img.src = _URL.createObjectURL(file);
            return false
        },
    getEventImageUploadUrl() {
        return apiBaseUrl + 'events/image/upload/' + this.eventForm.id;
    },
    uploadMerchandisImage(file) {
        var data= new FormData();
        data.append('image',file);

        uploadFile({data: data,url: this.getMerchandiseImageUploadUrl(),method:'post'} ).then((res) => {
            this.merchandiseForm.image_url = res.data.data
        });
        return false;
    },
    getMerchandiseImageUploadUrl() {
        return apiBaseUrl + 'merchandises/image/upload/' + this.merchandiseForm.id;
    },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            getEventTickets(){
                getEventTickets({}).then((res) => {
                    //this.total = res.data.total;
                    this.event_tickets = res.data.data;
                    this.event_tickets.push({
                        id: 1,
                        name: 'Bata'
                    })
                    //NProgress.done();
                });
            },
            getEvent(id) {
                getEvent({id: id}).then((res) => {
                    //this.total = res.data.total;
                    this.eventForm = res.data.data;
                    this.eventTickets = res.data.data.event_tickets
                    this.merchandises = res.data.data.merchandises
                    //NProgress.done();
                });
            }
        },
        computed: {
            getUploadUrl(){
                return apiBaseUrl + 'events/image/upload/' + this.eventForm.id;
            }
        },
        mounted() {
            if (this.$route.params.id) {
                this.getEvent(this.$route.params.id)
            }
            this.getEventTickets()
        },
        watch: {
            '$route': function (old, val) {
                var id =this.$route.params.id
                this.getEvent(this.$route.params.id)
            }
        }

    }
</script>
<style scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        margin: auto;
        width: 360px;
        height: 360px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 360px;
        height: 360px;
        display: block;
    }
</style>
