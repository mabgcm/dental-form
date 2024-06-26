import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { firestore, collection, addDoc, updateDoc, doc } from './firebase';
import './Form.css';

const Form = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({});
    const [documentId, setDocumentId] = useState(null);

    const totalSteps = 26; // Total number of steps/questions


    const saveData = async (data) => {
        let newFormData = { ...formData, ...data };
        setFormData(newFormData);

        try {
            if (documentId) {
                // Update existing document
                const docRef = doc(firestore, 'clients', documentId);
                await updateDoc(docRef, newFormData);
            } else {
                // Create new document
                const collectionRef = collection(firestore, 'clients');
                const docRef = await addDoc(collectionRef, newFormData);
                setDocumentId(docRef.id);
            }
        } catch (error) {
            console.error("Error saving data: ", error);
        }
    };

    const nextStep = async (data) => {
        await saveData(data);
        const pricingInfo = data.pricingInfo;
        if (step === 24 && pricingInfo === "No") {
            setStep(step + 1);
        } else if (step === 24 && pricingInfo === "Yes") {
            setStep(totalSteps); // Skip to thank you message
        } else {
            setStep(step + 1);
        }
    };

    // const skipStep = () => {
    //     setStep(step + 1);
    // };

    const onSubmit = async (data) => {
        await saveData(data);
        setStep(totalSteps); // Navigate to the thank you message
    };

    const renderQuestion = () => {
        switch (step) {
            case 0:
                return (
                    <div className="form-group">
                        <label className="h4"> 1/25</label> <br />
                        <label className="h2">How Long Have You Been Missing Your Teeth?</label>
                        <select className="form-control"  {...register("missingTeeth", { required: false })}>
                            <option value="">Select...</option>
                            <option value="I'm Not Missing Teeth">I'm Not Missing Teeth</option>
                            <option value="Less Than A Year">Less Than A Year</option>
                            <option value="More Than A Year">More Than A Year</option>
                        </select>
                        {errors.missingTeeth && <span>This field is required</span>}
                        <button type="button" className="btn btn-primary mt-3" onClick={handleSubmit(nextStep)}>Next</button>

                    </div>
                );
            case 1:
                return (
                    <div className="form-group">
                        <label className="h4"> 2/25</label> <br />
                        <label className="h2">Are you currently wearing dentures?</label>
                        <div>
                            <input type="radio" value="Yes" {...register("wearingDentures", { required: true })} /> Yes
                            <br />
                            <input type="radio" value="No" {...register("wearingDentures", { required: true })} /> No
                        </div>
                        {errors.wearingDentures && <span>This field is required</span>}
                        <button type="button" className="btn btn-primary mt-3" onClick={handleSubmit(nextStep)}>Next</button>
                    </div>
                );
            case 2:
                return (
                    <div className="form-group">
                        <label className="h4"> 3/25</label> <br />
                        <label className="h2">What made you reach out to our office?</label>
                        <select className="form-control"{...register("reachOutReason", { required: true })}>
                            <option value="">Select...</option>
                            <option value="Tooth Pain">Tooth Pain</option>
                            <option value="Missing Teeth">Missing Teeth</option>
                            <option value="Insecurities about the way you look">Insecurities about the way you look</option>
                            <option value="All of the above">All of the above</option>
                        </select>
                        {errors.reachOutReason && <span>This field is required</span>}
                        <button type="button" className="btn btn-primary mt-3" onClick={handleSubmit(nextStep)}>Next</button>
                    </div>
                );
            case 3:
                return (
                    <div className="form-group">
                        <label className="h4"> 4/25</label> <br />
                        <label className="h2"> <span>Select All That Apply</span> <br /> Do You Feel That Tooth Loss Has Affected Your:</label>
                        <div className='d-flex flex-column align-items-start px-3'>
                            <div>
                                <input type="checkbox" value="Personal Life" {...register("affectedAreas", { required: true })} /> Personal Life
                            </div>
                            <div>
                                <input type="checkbox" value="Professional Life" {...register("affectedAreas", { required: true })} /> Professional Life
                            </div>
                            <div>
                                <input type="checkbox" value="Enjoyment of Food" {...register("affectedAreas", { required: true })} /> Enjoyment of Food
                            </div>
                            <div>
                                <input type="checkbox" value="Physical Comfort" {...register("affectedAreas", { required: true })} /> Physical Comfort
                            </div>
                            <div>
                                <input type="checkbox" value="Oral Health" {...register("affectedAreas", { required: true })} /> Oral Health
                            </div>
                            <div>
                                <input type="checkbox" value="Appearance/Self Confidence" {...register("affectedAreas", { required: true })} /> Appearance/Self Confidence
                            </div>
                        </div>

                        {errors.affectedAreas && <span>This field is required</span>}
                        <button type="button" className="btn btn-primary mt-3" onClick={handleSubmit(nextStep)}>Next</button>
                    </div>
                );
            case 4:
                return (
                    <div className="form-group">
                        <label className="h4"> 5/25</label> <br />
                        <label className="h2">Does Your Condition Have A Negative Impact On Your Ability To Eat or Chew Certain Foods?</label>
                        <div>
                            <input type="radio" value="Yes" {...register("negativeImpact", { required: true })} /> Yes
                            <br />
                            <input type="radio" value="No" {...register("negativeImpact", { required: true })} /> No
                        </div>

                        {errors.negativeImpact && <span>This field is required</span>}
                        <button type="button" className="btn btn-primary mt-3" onClick={handleSubmit(nextStep)}>Next</button>
                    </div>
                );
            // Case 5
            case 5:
                return (
                    <div className="form-group">
                        <label className="h4"> 6/25</label> <br />
                        <label className="h2">What Is The Most Important Outcome You Are Seeking?</label>
                        <select className="form-control"{...register("importantOutcome", { required: true })}>
                            <option value="">Select...</option>
                            <option value="Function - Eating, Chewing, Talking">Function - Eating, Chewing, Talking</option>
                            <option value="Aesthetics - Beautiful, Natural Looking Teeth">Aesthetics - Beautiful, Natural Looking Teeth</option>
                            <option value="Both Are Equally As Important">Both Are Equally As Important</option>
                        </select>
                        {errors.importantOutcome && <span>This field is required</span>}
                        <button type="button" className="btn btn-primary mt-3" onClick={handleSubmit(nextStep)}>Next</button>
                    </div>
                );

            // Case 6
            case 6:
                return (
                    <div className="form-group">
                        <label className="h4"> 7/25</label> <br />
                        <label className="h2">What Is The Most Important Factor That Has Prevented You From Getting Treatment?</label>
                        <select className="form-control"{...register("importantFactor", { required: true })}>
                            <option value="">Select...</option>
                            <option value="Time">Time</option>
                            <option value="Money">Money</option>
                            <option value="Fear">Fear</option>
                            <option value="Can't Find The Right Dentist">Can't Find The Right Dentist</option>
                        </select>
                        {errors.importantFactor && <span>This field is required</span>}
                        <button type="button" className="btn btn-primary mt-3" onClick={handleSubmit(nextStep)}>Next</button>
                    </div>
                );

            // Case 7
            case 7:
                return (
                    <div className="form-group">
                        <label className="h4"> 8/25</label> <br />
                        <label className="h2">What is your timeline to receive treatment?</label>
                        <select className="form-control"{...register("timeline", { required: true })}>
                            <option value="">Select...</option>
                            <option value="Very little, I'm in no rush">Very little, I'm in no rush</option>
                            <option value="Moderate, Within 1-3 months">Moderate, Within 1-3 months</option>
                            <option value="High, I need help now">High, I need help now</option>
                        </select>
                        {errors.timeline && <span>This field is required</span>}
                        <button type="button" className="btn btn-primary mt-3" onClick={handleSubmit(nextStep)}>Next</button>
                    </div>
                );

            // Case 8
            case 8:
                return (
                    <div className="form-group">
                        <label className="h4"> 9/25</label> <br />
                        <label className="h2">Have you seen another dentist about your condition?</label>
                        <select className="form-control"{...register("seenAnotherDentist", { required: true })}>
                            <option value="">Select...</option>
                            <option value="No, This is my first consultation">No, This is my first consultation</option>
                            <option value="Yes, I did not feel comfortable with the other practice">Yes, I did not feel comfortable with the other practice</option>
                            <option value="Yes, I'm looking to compare pricing">Yes, I'm looking to compare pricing</option>
                        </select>
                        {errors.seenAnotherDentist && <span>This field is required</span>}
                        <button type="button" className="btn btn-primary mt-3" onClick={handleSubmit(nextStep)}>Next</button>
                    </div>
                );

            // Case 9
            case 9:
                return (
                    <div className="form-group">
                        <label className="h4"> 10/25</label> <br />
                        <label className="h2">If this is a second opinion what type of implant solution are you looking for?</label>
                        <select className="form-control"{...register("implantSolution", { required: true })}>
                            <option value="">Select...</option>
                            <option value="Fixed Full Arch">Fixed Full Arch</option>
                            <option value="Implant Supported Denture">Implant Supported Denture</option>
                            <option value="Single Implant">Single Implant</option>
                            <option value="Traditional Denture">Traditional Denture</option>
                            <option value="Not Sure">Not Sure</option>
                        </select>
                        {errors.implantSolution && <span>This field is required</span>}
                        <button type="button" className="btn btn-primary mt-3" onClick={handleSubmit(nextStep)}>Next</button>
                    </div>
                );

            // Case 10
            case 10:
                return (
                    <div className="form-group">
                        <label className="h4"> 11/25</label> <br />
                        <label className="h2">Are You The Decision Maker In Regards To Your Dental & Healthcare?</label>
                        <div>
                            <input type="radio" value="Yes" {...register("decisionMaker", { required: true })} /> Yes
                            <br />
                            <input type="radio" value="No" {...register("decisionMaker", { required: true })} /> No
                        </div>

                        {errors.decisionMaker && <span>This field is required</span>}
                        <button type="button" className="btn btn-primary mt-3" onClick={handleSubmit(nextStep)}>Next</button>
                    </div>
                );

            // Case 11
            case 11:
                return (
                    <div className="form-group">
                        <label className="h4"> 12/25</label> <br />
                        <label className="h2">How Familiar are you with the "All-On-4" treatment? <span>Scale of 1-10</span></label>
                        <div>
                            <input type="range" className='form-control-range' min="1" max="10" {...register("familiarityWithAllOn4", { required: true })} />
                        </div>

                        {errors.familiarityWithAllOn4 && <span>This field is required</span>}
                        <button type="button" className="btn btn-primary mt-3" onClick={handleSubmit(nextStep)}>Next</button>
                    </div>
                );

            // Case 12
            case 12:
                return (
                    <div className="form-group">
                        <label className="h4"> 13/25</label> <br />
                        <label className="h2">Do you suffer from any chronic illness or any medical condition (especially diabetes)?</label>
                        <div>
                            <input type="radio" value="Yes" {...register("chronicIllness", { required: true })} /> Yes <br />
                            <input type="radio" value="No" {...register("chronicIllness", { required: true })} /> No
                        </div>
                        {errors.chronicIllness && <span>This field is required</span>}
                        {watch("chronicIllness") === "Yes" && (
                            <div className="form-group">
                                <label>Please specify the medications you take (Including blood thinners e.g., Aspirin).</label>
                                <div>
                                    <input type="text" {...register("medications", { required: true })} />
                                    {errors.medications && <span>This field is required</span>}
                                </div>

                            </div>
                        )}
                        <button type="button" className="btn btn-primary mt-3" onClick={handleSubmit(nextStep)}>Next</button>
                    </div>
                );

            // Case 13
            case 13:
                return (
                    <div className="form-group">
                        <label className="h4"> 14/25</label> <br />
                        <label className="h2">Do you suffer from any oral pain, bleeding, and/or gum disease?</label>
                        <div>
                            <input type="radio" value="Yes" {...register("oralPain", { required: true })} /> Yes <br />
                            <input type="radio" value="No" {...register("oralPain", { required: true })} /> No
                        </div>

                        {errors.oralPain && <span>This field is required</span>}
                        <button type="button" className="btn btn-primary mt-3" onClick={handleSubmit(nextStep)}>Next</button>
                    </div>
                );

            // Case 14
            case 14:
                return (
                    <div className="form-group">
                        <label className="h4"> 15/25</label> <br />
                        <label className="h2">Do any of your teeth move when pressure is applied? If so, which tooth/teeth are wobbly?</label>
                        <div>
                            <input type="radio" value="Yes" {...register("teethMove", { required: true })} /> Yes <br />
                            <input type="radio" value="No" {...register("teethMove", { required: true })} /> No
                        </div>


                        <button type="button" className="btn btn-primary mt-3" onClick={handleSubmit(nextStep)}>Next</button>
                    </div>
                );

            // Case 15
            case 15:
                return (
                    <div className="form-group">
                        <label className="h4"> 16/25</label> <br />
                        <label className="h2">How long have you had missing tooth/teeth?</label>
                        <select className="form-control"{...register("missingTeethDuration", { required: true })}>
                            <option value="">Select...</option>
                            <option value="Less than a year">Less than a year</option>
                            <option value="1-3 years">1-3 years</option>
                            <option value="More than 3 years">More than 3 years</option>
                        </select>
                        {errors.missingTeethDuration && <span>This field is required</span>}
                        <button type="button" className="btn btn-primary mt-3" onClick={handleSubmit(nextStep)}>Next</button>
                    </div>
                );

            // Case 16
            case 16:
                return (
                    <div className="form-group">
                        <label className="h4"> 17/25</label> <br />
                        <label className="h2">Do you smoke? If so, how many and how often?</label>
                        <select className="form-control"{...register("smoking", { required: true })}>
                            <option value="">Select...</option>
                            <option value="Yes, I smoke daily">Yes, I smoke daily</option>
                            <option value="Yes, I smoke occasionally">Yes, I smoke occasionally</option>
                            <option value="No, I do not smoke">No, I do not smoke</option>
                        </select>
                        {errors.smoking && <span>This field is required</span>}
                        <button type="button" className="btn btn-primary mt-3" onClick={handleSubmit(nextStep)}>Next</button>
                    </div>
                );

            // Case 17
            case 17:
                return (
                    <div className="form-group">
                        <label className="h4"> 18/25</label> <br />
                        <label className="h2">What is your full name to write in the treatment plan and quote?</label>
                        <div>
                            <input type="text" {...register("fullName", { required: true })} />
                            {errors.fullName && <div>
                                <span>This field is required</span>
                            </div>}
                        </div>

                        <button type="button" className="btn btn-primary mt-3" onClick={handleSubmit(nextStep)}>Next</button>
                    </div>
                );

            // Case 18
            case 18:
                return (
                    <div className="form-group">
                        <label className="h4"> 19/25</label> <br />
                        <label className="h2">How old are you?</label>
                        <select className="form-control"{...register("age", { required: true })}>
                            <option value="">Select...</option>
                            <option value="Under 20">Under 20</option>
                            <option value="20-29">20-29</option>
                            <option value="30-39">30-39</option>
                            <option value="40-49">40-49</option>
                            <option value="50-59">50-59</option>
                            <option value="60 and above">60 and above</option>
                        </select>
                        {errors.age && <span>This field is required</span>}
                        <button type="button" className="btn btn-primary mt-3" onClick={handleSubmit(nextStep)}>Next</button>
                    </div>
                );

            // Case 19
            case 19:
                return (
                    <div className="form-group">
                        <label className="h4"> 20/25</label> <br />
                        <label className="h2">Do you have any dates in mind to travel for your dental treatment and holiday?</label>
                        <select className="form-control"{...register("travelDates", { required: true })}>
                            <option value="">Select...</option>
                            <option value="Within the next month">Within the next month</option>
                            <option value="1-3 months from now">1-3 months from now</option>
                            <option value="3-6 months from now">3-6 months from now</option>
                            <option value="More than 6 months from now">More than 6 months from now</option>
                        </select>
                        {errors.travelDates && <span>This field is required</span>}
                        <button type="button" className="btn btn-primary mt-3" onClick={handleSubmit(nextStep)}>Next</button>
                    </div>
                );

            // Case 20
            case 20:
                return (
                    <div className="form-group">
                        <label className="h4"> 21/25</label> <br />
                        <label className="h2">Which city do you currently reside in? And from which airport will you be departing?</label>
                        <div>
                            <input type="text" {...register("cityAndAirport", { required: true })} />
                        </div>
                        {errors.cityAndAirport && <span>This field is required</span>}
                        <button type="button" className="btn btn-primary mt-3" onClick={handleSubmit(nextStep)}>Next</button>
                    </div>
                );

            // Case 21
            case 21:
                return (
                    <div className="form-group">
                        <label className="h4"> 22/25</label> <br />
                        <label className="h2">What specific dental treatments are you interested in?</label>
                        <select className="form-control"{...register("dentalTreatments", { required: true })}>
                            <option value="">Select...</option>
                            <option value="Dental Implants">Dental Implants</option>
                            <option value="Crowns">Crowns</option>
                            <option value="Bridges">Bridges</option>
                            <option value="Veneers">Veneers</option>
                            <option value="Other">Other (please specify)</option>
                        </select>
                        {errors.dentalTreatments && <span>This field is required</span>}
                        {watch("dentalTreatments") === "Other" && (
                            <div>
                                <label>Please specify.</label>
                                <input type="text" {...register("otherDentalTreatments", { required: true })} />
                                {errors.otherDentalTreatments && <span>This field is required</span>}
                            </div>
                        )}
                        <button type="button" className="btn btn-primary mt-3" onClick={handleSubmit(nextStep)}>Next</button>
                    </div>
                );

            // Case 22
            case 22:
                return (
                    <div className="form-group">
                        <label className="h4"> 23/25</label> <br />
                        <label className="h2">What motivated you to seek treatment now?</label>
                        <select className="form-control"{...register("motivation", { required: true })}>
                            <option value="">Select...</option>
                            <option value="Pain">Pain</option>
                            <option value="Aesthetic reasons">Aesthetic reasons</option>
                            <option value="Functional reasons">Functional reasons</option>
                            <option value="Recommendation from a dentist">Recommendation from a dentist</option>
                            <option value="Other">Other (please specify)</option>
                        </select>
                        {errors.motivation && <span>This field is required</span>}
                        {watch("motivation") === "Other" && (
                            <div>
                                <label>Please specify.</label>
                                <input type="text" {...register("otherMotivation", { required: true })} />
                                {errors.otherMotivation && <span>This field is required</span>}
                            </div>
                        )}
                        <button type="button" className="btn btn-primary mt-3" onClick={handleSubmit(nextStep)}>Next</button>
                    </div>
                );

            // Case 23
            case 23:
                return (
                    <div className="form-group">
                        <label className="h4"> 24/25</label> <br />
                        <label className="h2">Are there any particular pains or issues you are experiencing that we should be aware of?</label>
                        <div>
                            <input type="radio" value="Yes" {...register("particularPains", { required: true })} /> Yes <br />
                            <input type="radio" value="No" {...register("particularPains", { required: true })} /> No
                        </div>
                        {errors.particularPains && <span>This field is required</span>}
                        {watch("particularPains") === "Yes" && (
                            <div>
                                <label>Please specify the pains or issues.</label>
                                <input type="text" {...register("painsDetails", { required: true })} />
                                {errors.painsDetails && <span>This field is required</span>}
                            </div>
                        )}
                        <button type="button" className="btn btn-primary mt-3" onClick={handleSubmit(nextStep)}>Next</button>
                    </div>
                );

            // Case 24
            case 24:
                return (
                    <div className="form-group">
                        <label className="h4">25/25</label> <br />
                        <label className="h5">For your convenience, we will send you the customized information in regards to pricing for dental implants via text and email</label>
                        <div>
                            <input type="radio" value="Yes" {...register("pricingInfo", { required: true })} /> Yes <br />
                            <input type="radio" value="No" {...register("pricingInfo", { required: true })} /> No
                        </div>
                        {errors.pricingInfo && <span className="text-danger">This field is required</span>}
                        <button type="button" className="btn btn-primary mt-3" onClick={handleSubmit(nextStep)}>Next</button>
                    </div>
                );

            // Case 25
            case 25:
                return (
                    <div className="form-group">
                        <label className="h5">By selecting no, we want to make sure that you are aware that we will not be able to provide you with the pricing and information you have requested regarding Dental Implants, immediately. We will reach out via a phone call but if you would like an email and text regarding pricing, please opt-in below.</label>
                        <select className="form-control" {...register("infoConsent", { required: true })}>
                            <option value="">Select...</option>
                            <option value="Yes, I consent to receive this information">Yes, I consent to receive this information</option>
                            <option value="I would like to schedule an appointment to talk in person">I would like to schedule an appointment to talk in person</option>
                            <option value="I would like to speak to someone via phone call to discuss">I would like to speak to someone via phone call to discuss</option>
                            <option value="I do not want this information">I do not want this information</option>
                        </select>
                        {errors.infoConsent && <span className="text-danger">This field is required</span>}
                        <button type="button" className="btn btn-primary mt-3" onClick={handleSubmit(onSubmit)}>Submit</button>
                    </div>
                );

            // Thank you message
            case totalSteps:
                return (
                    <div className="form-group">
                        <h2 className="text-center">Thank you for your responses!</h2>
                        <p className="text-center">We have received your information and will get back to you shortly.</p>
                    </div>
                );

            default:
                return (
                    <div className="form-group">
                        <h2 className="text-center">Thank you for your responses!</h2>
                        <p className="text-center">We have received your information and will get back to you shortly.</p>
                    </div>
                );
        }
    };

    return (
        <form>
            {renderQuestion()}
        </form>
    );
};

export default Form;
