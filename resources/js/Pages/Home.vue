<template>
  <div> 
    <!-- <div class="w-full">
      <a v-if="isAdmin" title="Go to admin dashboard" :href="route('dashboard')" class="float-right btn btn-primary mt-5 lg:ml-2" type="submit">Dashboard <i class="fa fa-arrow-right"></i></a>
    </div> -->
    <div class="w-full planner_main common-background min-h-screen flex justify-center">
      <div class="w-4/5">
        <logo class="block mx-auto w-full max-w-xs fill-white mb-6" />
        <div class="w-full" v-if="account && !fetching && !siteError">
            <!-- <tabs :options="{ useUrlFragment: false }" @clicked="tabClicked" @changed="tabChanged"> -->
            <tabs :options="{ useUrlFragment: false }" @changed="tabChanged">
            <tab name="Profile">
              <div>
                <form class="mt-2 bg-white rounded-lg form_parent" @submit.prevent="submit">
                  <div class="w-full">
                    <div class="row">
                      <div class="col-md-6 py-0 lg:pr-2">
                          <text-input
                              v-model="form.first_name"
                              :error="errors.first_name"
                              :required="true"
                              class="mt-4 form-group"
                              label="First Name"
                              placeholder="First Name"
                              type="text"
                              autofocus
                              autocapitalize="off"
                            />
                      </div>
                      <div class="col-md-6 py-0 lg:pl-2">
                        <text-input
                            v-model="form.last_name"
                            :error="errors.last_name"
                            :required="true"
                            class="mt-4 form-group"
                            label="Last Name"
                            placeholder="Last Name"
                            type="text"
                            autofocus
                            autocapitalize="off"
                          />
                      </div>
                    </div>
                   
                    <div class="row">
                      <multi-select-input
                          type="single"
                          :error="errors.role"
                          :required="true"
                          v-model="form.role" 
                          :options="rolesKeyValuePair" 
                          class="col-md-6 py-0 lg:pr-2 mt-4 form-group"
                          label="Role"
                          placeholder="Select Role" />

                      <div class="col-md-6 py-0 lg:pr-2">
                        <text-input
                          v-model="form.address"
                          :error="errors.address"
                          :required="true"
                          class="mt-4 form-group"
                          label="Address"
                          placeholder="Address"
                          type="text"
                        />
                      </div>
                      <div class="col-md-6 py-0 lg:pr-2">
                        <text-input
                          v-model="form.city"
                          :error="errors.city"
                          :required="true"
                          class="mt-4 form-group"
                          label="City"
                          placeholder="City"
                          type="text"
                        />
                      </div>
                      <div class="col-md-6 py-0 lg:pr-2">
                        <text-input
                          v-model="form.country"
                          :error="errors.country"
                          :required="true"
                          class="mt-4 form-group"
                          label="Country"
                          placeholder="Country"
                          type="text"
                        />
                      </div>
                      <div class="col-md-6 py-0 lg:pr-2">
                        <text-input
                          v-model="form.postal_code"
                          :error="errors.postal_code"
                          :required="true"
                          class="mt-4 form-group"
                          label="Postal Code"
                          placeholder="Postal Code"
                          type="text"
                        />
                      </div>
                      <div class="col-md-6 py-0 lg:pl-2" v-if="form.role === 'doctor'">
                        <text-input
                            v-model="form.licence_number"
                            :error="errors.licence_number"
                            :required="true"
                            class="mt-4 form-group"
                            label="Licence Number"
                            placeholder="Licence Number"
                            type="text"
                            autofocus
                            autocapitalize="off"
                          />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12 py-0">
                        <text-input
                            v-model="form.wallet_address"
                            :error="errors.wallet_address"
                            :required="true"
                            disabled="disabled"
                            class="mt-4 form-group"
                            placeholder="Ethereum Address "
                            label="Ethereum Address "
                            type="text"
                            autofocus
                            autocapitalize="off"
                          />
                      </div>
                    </div>
                    <div class="">
                      <div class="">
                        <a class="underline pt-4 mb-3 block" href="javascript:;" @click="changeAddress()">Not your address?</a>
                        <md-button class="md-raised md-primary ml-0 btn btn-primary" @click="submit()" :disabled="sending">
                          {{ exist ? 'Update' : 'Register' }}
                        </md-button>
                      </div>
                    </div>  
                  </div>
                  
                </form>
              </div>
            </tab>
            <tab name="Create Proposal" v-if="userData && userData.role == 'patient'">
              <div class="row">
                <div class="col-md-6">
                  <b>Proposal 1</b>
                  <div class="py-4 min-h-111">
                    Patient can suggest company name from below options for a particular vaccine type (e.g., Covid, Influenza). Those who have already received the vaccine will cast their votes on the proposal. Once the voting concludes, the proposer can view the results, and each participant will be rewarded with tokens for their participation.
                  </div>
                  <form ref="proposalOneForm" class="mt-2 bg-white rounded-lg form_parent overflow-hidden" @submit.prevent="createProposal">
                    <div class="w-full">
                      <div class="row">
                        <div class="col-md-12 py-3 lg:pr-2">
                            <text-input
                                v-model="proposalOneForm.title"
                                :error="formType == 1 ? errors.title : ''"
                                :required="true"
                                class="form-group"
                                label="Title"
                                placeholder="E.g. Which company's vaccine is good for me?"
                                type="text"
                                autofocus
                                autocapitalize="off"
                              />
                        </div>
                        <div class="col-md-12 py-3 lg:pr-2 datepickerdiv">
                          <date-input name="expiry" type="datetime" :error="formType == 1 ? errors.expiry : ''"  placeholder="Set expiry date" :start-from-number="24" :start-from-duration="'hours'" v-model="proposalOneForm.expiry"></date-input>
                        </div>
                        <div class="col-md-12 py-3">
                          <label for="select-input-26" class="form-label">Select Companies <span aria-hidden="true" role="presentation" class="text-red-700">*</span> :</label>
                          <label v-for="comp in companiesKeyValuePair" class="select-none container form-label block relative cursor-pointer pl-8 pt-1">
                            {{ comp }}
                            <input class="absolute opacity-0 left-0 top-0 cursor-pointer" type="checkbox" :value="comp" v-model="proposalOneForm.companies" />
                            <span class="h-6 w-6 checkmark absolute top-0 left-0 border"></span>
                          </label>
                          <div v-if="formType == 1 && errors.companies" class="form-error">{{ errors.companies }}</div>
                        </div>
                      </div>
                      <div class="mt-8">
                        <div class="">
                          <md-button class="md-raised md-primary ml-0 btn btn-primary" @click="createProposal(1)" :disabled="sendingProposal1">
                            Create Proposal <i class="fa fa-arrow-right"></i>
                          </md-button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="col-md-6">
                  <b>Proposal 2</b>
                  <div class="py-4 min-h-111">
                    Patient can propose vaccine options along with their health conditions mentioned below in the proposal. Only doctors are eligible to vote on these proposals. After voting, each participating doctor will receive tokens as a reward.
                  </div>
                  <form class="mt-2 bg-white rounded-lg form_parent overflow-hidden" @submit.prevent="createProposal">
                    <div class="w-full">
                      <div class="row">
                        <div class="col-md-12 py-3 lg:pr-2">
                            <text-input
                                v-model="proposalTwoForm.title"
                                :error="formType == 2 ? errors.title : ''"
                                :required="true"
                                class="form-group"
                                label="Title"
                                placeholder="E.g. Which company's vaccine is good for me based on my health condition(s)?"
                                type="text"
                                autofocus
                                autocapitalize="off"
                              />
                        </div>
                        <div class="col-md-12 py-3 lg:pr-2 datepickerdiv">
                          <date-input name="expiry" type="datetime" :error="formType == 2 ? errors.expiry : ''"  placeholder="Set expiry date" :start-from-number="24" :start-from-duration="'hours'" v-model="proposalTwoForm.expiry"></date-input>
                        </div>
                        <div class="col-md-12 py-3">
                          <label for="select-input-26" class="form-label">Select Companies <span aria-hidden="true" role="presentation" class="text-red-700">*</span> :</label>
                          <label v-for="comp in companiesKeyValuePair" class="select-none container form-label block relative cursor-pointer pl-8 pt-1">
                            {{ comp }}
                            <input class="absolute opacity-0 left-0 top-0 cursor-pointer" type="checkbox" :value="comp" v-model="proposalTwoForm.companies" />
                            <span class="h-6 w-6 checkmark absolute top-0 left-0 border"></span>
                          </label>
                          <div v-if="formType == 2 && errors.companies" class="form-error">{{ errors.companies }}</div>
                        </div>
                        <div class="col-md-12 py-3">
                          <label for="select-input-26" class="form-label">Health Conditions :</label>
                          <label v-for="condition in healthConditionsKeyValuePair" class="select-none container form-label block relative cursor-pointer pl-8 pt-1">
                            {{ condition }}
                            <input class="absolute opacity-0 left-0 top-0 cursor-pointer" type="checkbox" :value="condition" v-model="proposalTwoForm.healthConditions" />
                            <span class="h-6 w-6 checkmark absolute top-0 left-0 border"></span>
                          </label>
                        </div>
                      </div>
                      <div class="mt-8">
                        <div class="">
                          <md-button class="md-raised md-primary ml-0 btn btn-primary" @click="createProposal(2)" :disabled="sendingProposal2">
                            Create Proposal <i class="fa fa-arrow-right"></i>
                          </md-button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </tab>
            <tab name="Vote">
              <div class="w-full lg:max-w-full lg:flex">
                  <div v-if="allProposals && allProposals.length > 0" class="border-r border-b border-l border-gray-400 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                    <div class="border-b mb-8" v-for="proposal in allProposals" :key="proposal.proposalId">
                      <div class="mb-4">
                        <p class="text-sm text-gray-600 flex items-center">
                          Created By : {{ truncateAddress(proposal.proposer) }}
                        </p>
                        <div class="text-gray-900 font-bold text-xl mb-2">{{ proposal.title }}</div>
                        <p class="text-gray-700 text-base">
                          <radio-input :name="proposal.proposalId" v-model="proposal.voted" :options="proposal.options" :label="'Select any one option to Vote'"></radio-input>
                        </p>
                        <p v-if="proposal.proposalType == 'Proposal 2' && proposal.healthConditions.length > 0">
                          Health Conditions : {{ proposal.healthConditions.join(', ') }}
                        </p>
                      </div>
                      <div class="flex items-center mb-4">
                        <div class="text-sm w-4/5">
                          <p class="text-gray-900 leading-none">Expiry</p>
                          <p class="text-gray-600">{{ $moment.unix(proposal.expiry).format('lll') }}</p>
                        </div>
                        <md-button class="btn btn-primary custom-button" @click="vote(proposal.proposalId, proposal.voted, proposal.options)" :disabled="sending">
                          Vote
                        </md-button>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    No proposals yet.
                    <a href="#" @click="getProposals()">Refresh</a>
                  </div>
              </div>
            </tab>
            <tab name="My Proposal" v-if="userData && userData.role == 'patient'">
              <div class="w-full lg:max-w-full lg:flex">
                  <div v-if="myProposals && myProposals.length > 0" class="border-r border-b border-l border-gray-400 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                    <div class="border-b mb-8" v-for="proposal in myProposals" :key="'my'+proposal.proposalId">
                      <div class="mb-4">
                        <p class="text-sm text-gray-600 flex items-center">
                          {{ proposal.proposalType }}
                        </p>
                        <div class="text-gray-900 font-bold text-xl mb-2">{{ proposal.title }}</div>
                        <p v-if="proposal.options" v-for="option in proposal.options" class="text-gray-700 text-base">
                          {{ option.optionName }} ({{ option.votes }})
                        </p>
                        <p class="mb-2 mt-2 border border-solid pl-2" v-if="displayWinner(proposal.options)">{{ displayWinner(proposal.options) }}</p>
                        <p class="mt-3" v-if="proposal.proposalType == 'Proposal 2' && proposal.healthConditions.length > 0">
                          Health Conditions : {{ proposal.healthConditions.join(', ') }}
                        </p>
                      </div>
                      <div class="flex items-center mb-4">
                        <div class="text-sm w-4/5" v-if="!isExpired(proposal.expiry)">
                          <p class="text-gray-900 leading-none">Expiry</p>
                          <p class="text-gray-600">{{ $moment.unix(proposal.expiry).format('lll') }}</p>
                        </div>
                        <div class="text-sm w-4/5" v-else>
                          <p class="text-gray-600">{{ $moment.unix(proposal.expiry).format('lll') }} (Expired)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    No proposals yet.
                    <a href="#" @click="getMyProposals()">Refresh</a>
                  </div>
              </div>
            </tab>
            <tab name="My Vaccine History">
              <div class="w-full lg:max-w-full lg:flex">
                <md-button @click="getVaccineHistory(userData.wallet_address, userData.role)" class="btn btn-primary custom-button">
                  View History
                </md-button>
              </div>
            </tab>
            <tab name="Search">
              <text-input
                v-model="search"
                class="mb-6 form-group w-full"
                :label="'Search ' + (userData && userData.role == 'patient' ? 'doctors' : 'patients')"
                placeholder="Search with name, wallet address, postal code etc."
                type="text"
                autofocus
                autocapitalize="off"
                @keyup.enter.native="searchUsers"
              />
              <div class="w-full lg:max-w-full lg:flex">
                  <div v-if="usersData && usersData.length > 0" class="border-r border-b border-l border-gray-400 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                    <div class="border-b mb-8" v-for="user in usersData" :key="'search'+user.uuid">
                      <div class="mb-4">
                        <p class="text-sm text-gray-600 items-center mb-4">
                          Wallet : {{ truncateAddress(user.wallet_address) }}
                          <a class="float-right cursor-pointer" @click="getVaccineHistory(user.wallet_address, user.role)">Check Vaccination History</a>
                        </p>
                        <div class="text-gray-900 font-bold text-xl mb-2">{{ user.first_name }} {{ user.last_name }}</div>
                        <p class="text-gray-700 text-base" v-if="user.address">
                          Address : {{ user.address }}
                        </p>
                        <p class="text-gray-700 text-base" v-if="user.city">
                          City : {{ user.city }}
                        </p>
                        <p class="text-gray-700 text-base" v-if="user.state">
                          State : {{ user.state }}
                        </p>
                        <p class="text-gray-700 text-base" v-if="user.country">
                          Country : {{ user.country }}
                        </p>
                        <p class="text-gray-700 text-base" v-if="user.postal_code">
                          Postal Code : {{ user.postal_code }}
                        </p>
                      </div>
                      <div class="flex items-center mb-4">
                        <div class="text-sm w-4/5" v-if="user.role == 'doctor'">
                          <p class="text-gray-900 leading-none">Licence Number</p>
                          <p class="text-gray-600">{{ user.licence_number ? user.licence_number : '-' }}</p>
                        </div>
                        <md-button @click="chooseDoctor(user.wallet_address)" class="btn btn-primary custom-button" v-if="user.role == 'doctor'">
                          Select doctor
                        </md-button>
                        <md-button @click="changeVaccination(user.wallet_address)" class="btn btn-primary custom-button" v-else>
                          Select for Vaccination
                        </md-button>
                      </div>
                    </div>
                  </div>
                  <div v-if="usersData && usersData.length < 1">
                    No data found.
                  </div>
              </div>
            </tab>
            <tab name="Redeem">
              <div class="mb-6" v-if="totalBalance">
                Total Balance : {{ totalBalance }}
                <span @click="refreshHoldings()">
                <SvgIcon
                  title="Refresh holdings"
                  class="inline cursor-pointer"
                  type="mdi"
                  :path="icons.mdiRefresh"
                />
                </span>
              </div>
              <text-input
                v-model="ethTransferAddress"
                :required="true"
                class="form-group"
                label="Wallet Address"
                placeholder="Enter wallet address of the user to redeem your tokens."
                type="text"
                autofocus
                autocapitalize="off"
              />
              <span class="w-full block text-center mt-6">OR</span>
              <div class="text-center mt-6 cursor-pointer" @click="barcodeModalState = true">
                <b>{{ barcode }}</b>
                <SvgIcon
                  class="inline"
                  type="mdi"
                  :path="icons.mdiBarcodeScan"
                />
              </div>
              <div class="close float-right z-50 text-red-600 relative cursor-pointer" title="Close QR scanner" v-if="showClose" @click="modalClose">
                <SvgIcon type="mdi" :path="icons.mdiCloseThick" />
              </div>
              <StreamBarcodeReader ref="scanner" v-if="barcodeModalState" @decode="onDecode" @loaded="onLoaded"></StreamBarcodeReader>

              <text-input
                v-model="transferAmount"
                :required="true"
                class="form-group"
                label="Amount to redeem"
                placeholder="Enter token amount."
                type="number"
                autofocus
                autocapitalize="off"
              />
              <md-button class="md-raised md-primary ml-0 mt-2 btn btn-primary" @click="transfer()">
                Transfer
              </md-button>
            </tab>
        </tabs>
        </div>
        <div v-else-if="!fetching && !siteError" class="text-center w-full mt-6">
          <loading-button class="btn-custom-color  mx-auto btn btn-primary" type="button" @click="connect()">Connect your wallet</loading-button>
        </div>
        <div v-else-if="fetching && !siteError" class="text-center w-full mt-6">
          <h3 class=" mx-auto">Please wait, we are fetching your details.....</h3>
        </div>
  
        <div v-else-if="siteError" class="text-center w-full mt-6">
          <h3 class=" mx-auto">{{siteErrorMessage}}</h3>
        </div>
  
        <!-- <loading-button v-if="currentStep === 1 && step2" @click="next()" class="btn-custom-color mt-5" type="submit">Next</loading-button> -->
      </div>
    </div>
    <loader v-if="loadingMessage" :message="loadingMessage"></loader>
  </div>
  </template>
  
  <script>
  import Web3 from "web3"
  import LoadingButton from "@/Shared/LoadingButton"
  import TextInput from "@/Shared/TextInput"
  import FileInput from "@/Shared/FileInput"
  import TextAreaInput from "@/Shared/TextareaInput"
  import CheckboxInput from "@/Shared/CheckboxInput"
  import RadioInput from "@/Shared/RadioInput"
  import MultiSelectInput from "@/Shared/MultiSelectInput";
  import DateInput from "@/Shared/DateInput"
  import Logo from "@/Shared/Logo"
  import Loader from "@/Shared/Loader"
  import NProgress from "nprogress"
  import axios from "axios"
  import { ethers } from "ethers"
  import 'vue-tabs-component/docs/resources/tabs-component.css';

  import { getAccount, watchAccount, watchNetwork, disconnect } from '@wagmi/core'
  import truncateEthAddress from 'truncate-eth-address'
  import { serializeError } from 'eth-rpc-errors'
  import SvgIcon from '@jamescoyle/vue-icon'
  import { mdiBarcodeScan, mdiCloseThick, mdiRefresh } from '@mdi/js'
  import { StreamBarcodeReader } from "vue-barcode-reader";
  
  export default {
    metaInfo: { title: "Home" },
    components: {
      LoadingButton,
      Logo,
      TextInput,
      FileInput,
      TextAreaInput,
      RadioInput,
      CheckboxInput,
      MultiSelectInput,
      DateInput,
      Loader,
      StreamBarcodeReader,
      SvgIcon,
    },
    props: {
      errors: Object,
    },
    data() {
      return {
        totalBalance: null,
        exist: false,
        showClose: false,
        ethTransferAddress: null,
        transferAmount: null,
        barcode: 'Click to scan barcode',
        barcodeModalState: false,
        icons: {
          mdiBarcodeScan,
          mdiCloseThick,
          mdiRefresh,
        },
        search: null,
        recordDAO: null,
        propsalDAO: null,
        erc20: null,
        siteError: false,
        siteErrorMessage: null,
        loadingMessage: null,
        sending: false,
        sendingProposal1: false,
        sendingProposal2: false,
        fetching: false,
        provider: null,
        account: null,
        allProposals: [],
        myProposals: [],
        usersData: null,
        proposalOneForm: {
          title: null,
          companies: [],
          expiry: null,
        },
        proposalTwoForm: {
          title: null,
          companies: [],
          healthConditions: [],
          expiry: null,
        },
        userData: null,
        form: {
          first_name: null,
          last_name: null,
          role: null,
          address: null,
          wallet_address: null,
          country: null,
          city: null,
          postal_code: null,
          licence_number: null,
        },
        blockchainError: null,
        isAdmin: false,
        rolesKeyValuePair: [
          {'value' : '','text' : 'Select Option'},
          {'value' : 'patient','text' : 'Patient'},
          {'value' : 'doctor','text' : 'Doctor'},
        ],
        companiesKeyValuePair: [],
        healthConditionsKeyValuePair: [],
        formType: null,
        vaccineHistory: null,
        myVaccineHistory: [],
      };
    },
    async mounted () {
      const $this = this
      localStorage.removeItem('wc@2:client:0.3//session')
      await $this.connect()
      $this.fetchSettings()
    },
    watch: {
      sending(value) {
        if (value) {
          this.loadingMessage = 'Processing your request, please wait...'
        } else {
          this.loadingMessage = null
        }
      },
    },
    beforeUnmount() {
      this.modalClose()
    },
    methods: {
      tabChanged(selectedTab) {
        if (selectedTab && selectedTab.tab && selectedTab.tab.name == 'My Vaccine History' && this.userData && this.userData.wallet_address) {
          this.getVaccineHistory(this.userData.wallet_address, this.userData.role)
        }
      },
      displayWinner(options) {
        let sortable = [];
        let winner = null
        options.forEach((item, key) => {
          sortable.push([item.optionName, item.votes.toString()]);
        })

        sortable.sort(function(a, b) {
            return b[1] - a[1];
        });

        if (sortable.length > 0) {
          winner = sortable[0]
          if (winner && winner[1] && winner[1] > 0)  {
            return ' Winner : '+winner[0] + ' (' + winner[1] + ')'
          } else {
            winner = null
          }
        }

        return winner
      },
      onDecode (result) { 
        if (result.includes(':')) {
          const arr = result.split(':')
          this.ethTransferAddress = arr[1]
        } else {
          this.ethTransferAddress = result
        }

        this.modalClose()
      },
      onLoaded() {
        this.showClose = true
        console.log('loaded')
      },
      modalClose() {
        this.$refs.scanner.codeReader.stream.getTracks().forEach(function (track) {
          track.stop();
        });

        this.showClose = false
        this.barcodeModalState = false
      },
      async refreshHoldings() {
        console.log('refresh')
        const symbol = await this.erc20.symbol()
        const balance = await this.erc20.balanceOf(this.account)
        const totalEth = ethers.utils.formatEther(balance)
        console.log(totalEth)

        this.totalBalance = parseFloat(totalEth) + ' ' + symbol
      },
      async transfer () {
        if (!this.ethTransferAddress || !ethers.utils.isAddress(this.ethTransferAddress)) {
          this.displayMessage('Please enter valid wallet address.', 'error')
          return
        }

        if (!this.transferAmount || this.transferAmount < 0 || this.transferAmount == 0) {
          this.displayMessage('Please enter valid amount to trnasfer.', 'error')
          return
        }

        const balance = await this.erc20.balanceOf(this.account)
        const totalEth = ethers.utils.formatEther(balance)
        console.log(parseFloat(totalEth))
        if (parseFloat(totalEth) < this.transferAmount) {
          this.displayMessage('You dont have enough token to redeem, your balance is '+totalEth, 'error')
          return
        }

        try {
          console.log(this.transferAmount)
          this.loadingMessage = 'Authorize the transaction from the Wallet.'
          const gas = await this.erc20.estimateGas.transfer(this.ethTransferAddress, ethers.utils.parseUnits(this.transferAmount, 18))
          console.log('gas', gas.toString())
          const vote = await this.erc20.transfer(
            this.ethTransferAddress, 
            ethers.utils.parseUnits(this.transferAmount, 18),
            {
              gasLimit: gas.toString(),
            }
          )
          this.loadingMessage = 'Executing the transaction, please wait and do not refresh the page.'
          let receipt = await vote.wait(1)
          console.log(receipt)
          this.loadingMessage = null
          this.displayMessage(this.transferAmount + ' token(s) redeemed successfully.', 'success')
        } catch (e) {
          this.handleError(e)
          this.loadingMessage = null
          return
        }

      },
      isExpired(time) {
        return this.$moment().unix() > time.toString() 
      },
      truncateAddress(address) {
        return truncateEthAddress(address)
      },
      displayMessage(msg, type) {
        window.Common.default.alertPopup({
            text: msg,
            type: type,
            toast: true,
            position: 'top-end',
            showCancel: false,
            showConfirm: false,
            reverseButtons: false,
            timer: 3000,
            timerProgress: true,
        })
      },
      handleError (e) {
        const error = serializeError(e)
        let msg = null
        if (typeof error.data !== 'undefined' && typeof error.data.originalError !== 'undefined' && typeof error.data.originalError.reason !== 'undefined') {
          msg = error.data.originalError.reason
        } else {
          msg = error.message
        }

        window.Common.default.alertPopup({
            text: msg,
            type: 'error',
            toast: true,
            position: 'top-end',
            showCancel: false,
            showConfirm: false,
            reverseButtons: false,
            timer: 3000,
            timerProgress: true,
        })
      },
      async getVaccineHistory(walletAddress, role) {
        const $this = this
        $this.loadingMessage = 'Fetching data....'
        try {
          this.vaccineHistory = await this.recordDAO.vaccineHistory(walletAddress, role)
        } catch (e) {
          console.log(e)
        }
        $this.loadingMessage = false

        let html = '<table class="styled-table"><thead><tr><th class="text-center">Name</th><th class="text-center">Date</th></tr></thead><tbody>'

        if (this.vaccineHistory && this.vaccineHistory.length > 0) {
          this.vaccineHistory.forEach((item, key) => {
            html += '<tr><td>'+item.companyName+'</td><td>'+$this.$moment.unix(item.date).format('lll')+'</td></tr>'
          })
        } else {
          html += '<tr><td col-span="2">No data found.</td></tr>'
        }

        html += '</tbody></table>'

        window.Common.default
        .alertPopup({
          title: "Vaccination History",
          confirmButton: "Close",
          showCancel: false,
          noIcon: true,
          html: html,
        })
      },
      async chooseDoctor (address) {
        const $this = this
        window.Common.default
        .alertPopup({
          text: "Are you sure you want to select this doctor for vaccination?",
          confirmButton: "Yes",
          confirmCancel: "No, Cancel!",
          type: "question",
          iconHtml: '<img src="/images/questionicon.svg">',
        })
        .then(async function (result) {
          if (result.value) {
            $this.loadingMessage = 'Authorize the transaction from the Wallet.'
            try {
              const gas = await $this.recordDAO.estimateGas.assignDoctor(address)

              console.log('gas', gas.toString())

              const vote = await $this.recordDAO.assignDoctor(
                address,
                {
                  gasLimit: gas.toString(),
                }
              )

              $this.loadingMessage = 'Executing the transaction, please wait and do not refresh the page.'
              let receipt = await vote.wait(1)
              console.log(receipt)
              $this.$inertia.post($this.route("setDoctor"), {
                  doctor_wallet_address: address,
                }, {
                  onStart: () => {
                  },
                  onSuccess: page => {
                    $this.loadingMessage = null
                  },
                  onFinish: errors => {
                    $this.loadingMessage = null
                  },
                  onError: errors => {
                    $this.loadingMessage = null
                  },
                });
            } catch (e) {
              $this.handleError(e)
              $this.loadingMessage = null
              return
            }
          } else if (result.dismiss) {
            
          }
        });
      },
      async changeVaccination (address) {
        const $this = this


        let obj = '<select class="form-input" id="swal-input1"><option value="">Select Company</option>'
        this.companiesKeyValuePair.forEach((item, key) => {
          obj += '<option value="'+item+'">'+item+'</option>'
        })

        obj += '<option value="Other">Other</option></select>'

        const confirmation = await window.Common.default.customPopup({
          html: obj+`<input id="swal-input2" placeholder="Enter company name" class="form-input mt-3 hidden">`,
          confirmButton: 'Vaccinate'
        })

        if (confirmation.isConfirmed && confirmation.value && confirmation.value.length > 0) {
          $this.loadingMessage = 'Authorize the transaction from the Wallet.'
          try {
            let val = confirmation.value[0]
            if (val == 'Other') {
              val = confirmation.value[1]
            }

            console.log(val)
            const gas = await $this.recordDAO.estimateGas.updateVaccinatedStatus(address, val)

            console.log('gas', gas.toString())

            const vote = await $this.recordDAO.updateVaccinatedStatus(
              address,
              val,
              {
                gasLimit: gas.toString(),
              }
            )

            $this.loadingMessage = 'Executing the transaction, please wait and do not refresh the page.'
            let receipt = await vote.wait(1)
            console.log(receipt)
            $this.$inertia.post($this.route("vaccinated"), {
              patient_wallet_address: address,
              vaccine_company_name: val,
            }, {
              onStart: () => {
              },
              onSuccess: page => {
                $this.loadingMessage = null
              },
              onFinish: errors => {
                $this.loadingMessage = null
              },
              onError: errors => {
                $this.loadingMessage = null
              },
            });
          } catch (e) {
            $this.handleError(e)
            $this.loadingMessage = null
            return
          }
        }
      },
      searchUsers() {
        const $this = this
        
        $this.loadingMessage = 'Fetching data...'
        const headers = {
          'X-CSRF-TOKEN': this.$page.props.csrf,
        }
        
        axios
        .post(this.route("search"), {key: this.search}, {
          headers: headers
        })
        .then(function (res) {
          if (res.data && res.data.users) {
            $this.usersData = res.data.users
          }
          $this.loadingMessage = null
        }).catch(function (e) {
          console.log(e)
          $this.loadingMessage = null
        })
      },
      async changeChain(chainId) {
        const $this = this
        try {
            await $this.provider.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: window.web3.utils.toHex(chainId)}],
            })
            return true
        } catch (switchError) {
            console.log(switchError)
            // The network has not been added to MetaMask
            if (switchError.code === 4902) {
              alert("Please add the Polygon network to MetaMask")
            }
            alert("Cannot switch to the network")
        }
        return false
      },
      async changeAddress() {
        await disconnect()
        //localStorage.removeItem('wagmi.connected')
        //localStorage.removeItem('wagmi.store')
        localStorage.clear()
        this.provider = null
        this.account = null
        //this.connect()
      },
      async getProposals() {
        const $this = this
        try {
          let data = []
          $this.allProposals = []
          if ($this.userData.role == 'patient') {
            data = await $this.propsalDAO.getProposalsByType('Proposal 1')
          } else {
            data = await $this.propsalDAO.getProposalsByType('Proposal 2')
          }

          if (data && data[0]) {
            data[0].forEach((item, key) => {
              let temp = { ...item }
              let isVoted = data[1][key]
              if (isVoted) {
                const options = temp.options
                let votedValue = options[data[2][key]]
                temp.voted = votedValue.optionName
              } else {
                temp.voted = null
              }

              if (temp.proposer != $this.account) {
                $this.allProposals.push(temp)
              }
            })
          }
        } catch (error) {

        }
      },
      async getMyProposals() {
        const $this = this
        try {
          $this.myProposals = await $this.propsalDAO.getProposalsByProposer($this.account)
          console.log('$this.myProposals', $this.myProposals)
        } catch (error) {

        }
      },
      async vote(id, selectedOption, options) {
        const $this = this
        const key = this._.findKey(options, { optionName: selectedOption })
        $this.loadingMessage = 'Authorize the transaction from the Wallet.'

        console.log(ethers.BigNumber.from(key))
        try {
          const gas = await $this.propsalDAO.estimateGas.vote(
            id,
            key,
          )

          console.log('gas', gas.toString())

          const vote = await $this.propsalDAO.vote(
            id,
            key,
            {
              gasLimit: gas.toString(),
            }
          )

          $this.loadingMessage = 'Executing the transaction, please wait and do not refresh the page.'
          let receipt = await vote.wait(1)
          console.log(receipt)

          this.$inertia.post(this.route("vote"), {
            wallet_address: $this.account,
            blockchain_proposal_id: id,
            option: selectedOption,
            transaction_id: receipt.transactionHash,
          }, {
            onStart: () => {
            },
            onSuccess: page => {
              $this.loadingMessage = null
            },
            onFinish: errors => {
              $this.loadingMessage = null
            },
            onError: errors => {
              $this.loadingMessage = null
            },
          });

        } catch (e) {
          $this.handleError(e)
          $this.loadingMessage = null
          return
        }
      },
      async createProposal(type) {
        const $this = this
        //$this.errors = []
        $this.formType = type

        console.log('type', type)

        // const getP = await $this.propsalDAO.getProposalDetails('0x7b1a9425ddfce0b16dbbeacca88fd674cda61e7d55d2a0eea2ca173ccccf646b')
        // console.log('getP', getP)

        if (!this.account) {
          window.Common.default.alertPopup({
              text: 'Please connect your wallet.',
              type: 'error',
              toast: true,
              position: 'top-end',
              showCancel: false,
              showConfirm: false,
              reverseButtons: false,
              timer: 3000,
              timerProgress: true,
          })
          return
        }

        $this.loadingMessage = 'Authorize the transaction from the Wallet.'

        try {
          this.proposalOneForm.type = type
          this.proposalTwoForm.type = type

          let sending = this.sendingProposal2
          let form = this.proposalTwoForm
          if (type == 1) {
            form = this.proposalOneForm
            sending = this.sendingProposal1
          }

          console.log('form', form)
          const expiry = this.$moment(form.expiry).unix()

          const gas = await $this.propsalDAO.estimateGas.createProposal(
            form.title,
            form.companies,
            expiry,
            type == 2 ? form.healthConditions : [],
            type == 2 ? 'Proposal 2' : 'Proposal 1',
          )

          console.log('gas', gas.toString())

          const create = await $this.propsalDAO.createProposal(
            form.title,
            form.companies,
            expiry,
            type == 2 ? form.healthConditions : [],
            type == 2 ? 'Proposal 2' : 'Proposal 1',
            {
              gasLimit: gas.toString(),
            }
          )

          // console.log(create)
          // console.log('data', create.data)
          // const abi = new ethers.utils.Interface(window.Common.default.proposalABI())
          // console.log('abi', abi)
          // const decodedResult = abi.decodeFunctionResult('createProposal', create.data)
          // console.log('decodedResult', decodedResult)

          $this.loadingMessage = 'Executing the transaction, please wait and do not refresh the page.'
          let receipt = await create.wait(1);
          console.log(receipt)

          if (receipt.events && receipt.events[0] && receipt.events[0].args) {
            form.proposal_id = receipt.events[0].args.proposalId
          }

          this.$inertia.post(this.route("createProposal"), form, {
            onStart: () => {
              sending = true
            },
            onSuccess: page => {
              sending = false
              $this.loadingMessage = null
              form.title = null
              form.companies = []
              form.expiry = null
              form.healthConditions = []
            },
            onFinish: errors => {
              sending = false
              $this.loadingMessage = null
            },
            onError: errors => {
              sending = false
              $this.loadingMessage = null
            },
          });
        } catch (e) {
          $this.loadingMessage = null
          $this.handleError(e)
          return
        }
      },
      async submit() {
        const $this = this
        this.form.wallet_address = this.account

        $this.loadingMessage = 'Authorize the transaction from the Wallet.'
        try {
          const add = await $this.recordDAO.addHealthRecord(
            this.form.first_name, 
            this.form.last_name,
            this.form.address,
            this.form.role,
            this.form.city,
            this.form.country,
            this.form.postal_code,
            this.form.licence_number ? this.form.licence_number : '',
            {
              gasLimit: 300000,
            }
          )

          console.log(add)

          $this.loadingMessage = 'Executing the transaction, please wait and do not refresh the page.'
          let receipt = await add.wait(1);
          console.log(receipt)

          this.$inertia.post(this.route("register"), this.form, {
            onStart: () => (this.sending = true),
            onSuccess: page => {
              $this.sending = false
              $this.loadingMessage = null
            },
            onFinish: errors => {
              $this.sending = false
              $this.loadingMessage = null
            },
            onError: errors => {
              $this.sending = false
              $this.loadingMessage = null
            },
          });
        } catch (error) {
          console.log('Add record error', error)
          $this.loadingMessage = null
        }
      },
      fetchSettings() {
        const $this = this
        const headers = {
          'X-CSRF-TOKEN': this.$page.props.csrf,
        }
        
        axios
        .post(this.route("settings"), {key: ['companies', 'health_conditions']}, {
          headers: headers
        })
        .then(function (res) {
          if (res.data && res.data.data && res.data.data.length > 0) {
            res.data.data.forEach((setting) => {
              const values = JSON.parse(setting.value)
              values.forEach((value, key) => {
                if (setting.key === 'companies') {
                  $this.companiesKeyValuePair.push(value)
                } else {
                  $this.healthConditionsKeyValuePair.push(value)
                }
              })
            })
          }
        }).catch(function (e) {
          console.log(e)
        })
      },
      fetchDetails () {
        const $this = this

        if (!this.account) {
          return
        }
  
        this.form.wallet_address = this.account
        this.fetching = true
        this.siteError = false
  
        const headers = {
          'X-CSRF-TOKEN': this.$page.props.csrf,
        }
        NProgress.start()
        this.fetching = true
  
        axios
        .get(this.route("fetch", this.account), {
          headers: headers
        })
        .then(function (res) {
          NProgress.done();
          $this.fetching = false
  
          $this.isAdmin = res.data.isAdmin
          if (res.data.profile) {
            $this.exist = true
            $this.userData = res.data.profile
            $this.form.first_name = res.data.profile.first_name
            $this.form.last_name = res.data.profile.last_name
            $this.form.role = res.data.profile.role
            $this.form.address = res.data.profile.address
            $this.form.city = res.data.profile.city
            $this.form.country = res.data.profile.country
            $this.form.postal_code = res.data.profile.postal_code
            $this.form.licence_number = res.data.profile.licence_number
            $this.getProposals()
            $this.getMyProposals()
          }
        }).catch(function (e) {
          console.log(e)
          $this.siteError = true
          $this.siteErrorMessage = 'Something went wrong, please try again after some time.'
          if (e.response && e.response.data && e.response.data.msg) {
            $this.siteErrorMessage = e.response.data.msg
          }
          NProgress.done();
          $this.fetching = false
        })
      },
      async connect() {
        const $this = this
        const web3Modal = await this.loadWeb3Modal($this.$page.props.wallet_connect.project_id)
        this.provider = await web3Modal.openModal()

        web3Modal.subscribeEvents(async (event) => {
          console.log(event.name)
          if (event.name === 'ACCOUNT_CONNECTED') {
            const account = getAccount()
            console.log(account)
            $this.provider = await account.connector.getProvider()
            window.web3 = new Web3($this.provider)


            const web3ModalProvider = new ethers.providers.Web3Provider($this.provider);
            const { chainId } = await web3ModalProvider.getNetwork()

            console.log(chainId)

            /////
            if (chainId != $this.$page.props.chain_id) {
              alert('You are on wrong network, please change it from your wallet.')
              const change = await $this.changeChain($this.$page.props.chain_id)
              if (!change) {
                return false
              }
            }

            this.recordDAO = new ethers.Contract(
              $this.$page.props.contracts.users_records,
              //'0x91D18bEa41b67a3C9d482FD5d8F15219f6895fb4',
              window.Common.default.records(),
              web3ModalProvider.getSigner()
            )

            this.propsalDAO = new ethers.Contract(
              $this.$page.props.contracts.proposal,
              //'0x91D18bEa41b67a3C9d482FD5d8F15219f6895fb4',
              window.Common.default.proposalABI(),
              web3ModalProvider.getSigner()
            )

            this.erc20 = new ethers.Contract(
              $this.$page.props.contracts.erc20, 
              window.Common.default.erc20ABI(),
              web3ModalProvider.getSigner()
            )


            //this.erc20.addMinter($this.$page.props.contracts.proposal)
            //this.erc20.addMinter($this.$page.props.contracts.users_records)
            //this.propsalDAO.changeVotePermission('0x0', true)

            ////////

            $this.account = account.address

            const symbol = await this.erc20.symbol()
            const balance = await this.erc20.balanceOf(this.account)
            const totalEth = ethers.utils.formatEther(balance)

            this.totalBalance = parseFloat(totalEth) + ' ' + symbol

            $this.fetchDetails()

            // Subscribe to accounts change

            if (account.isConnected) {
              watchAccount((account) => {
                $this.allProposals = []
                $this.search = null
                $this.usersData = null
                $this.account = account.address
                $this.fetchDetails()
                $this.refreshHoldings()
              })

              // Subscribe to chainId change
              watchNetwork((chain) => {
                $this.allProposals = []
                $this.search = null
                $this.usersData = null
                console.log(chain)
                //location.reload()
              })
            }
          }
        })
      },
    },
  };
  </script>
 
 <style>

.input-box {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.input-box div {
  position: relative;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 4px;
  line-height: 35px;
  margin-left: 5px;
  padding: 0 35px 0 5px;
  cursor: pointer;
}
.input-box div b {
  display: inline-block;
  width: 200px;
  max-width: 60vw;
  text-align: left;
}
.input-box div svg {
  position: absolute;
  top: 4px;
  bottom: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  margin: auto 0;
  color: #666;
}

</style>